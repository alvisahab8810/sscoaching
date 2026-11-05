// NIOS online admission: check the OTP, then log the student in (the
// account is created on the first successful login).
import bcrypt from "bcryptjs";
import { verifySmsOtp } from "@/lib/msg91";
import Otp from "@/models/onlineAdmission/Otp";
import Applicant from "@/models/onlineAdmission/Applicant";
import { route, fail, digits, isMobile, startApplicantSession } from "@/lib/onlineAdmission/server";

const MAX_ATTEMPTS = 5;

export default route({
  async POST(req, res) {
    const mobile = digits(req.body?.mobile);
    const code = String(req.body?.otp || "").trim();
    if (!isMobile(mobile)) throw fail(400, "Enter a valid 10-digit Indian mobile number");
    if (!/^\d{4,6}$/.test(code)) throw fail(400, "Incorrect OTP");

    const pending = await Otp.findOne({ mobile, expiresAt: { $gt: new Date() } }).sort({ createdAt: -1 });
    if (!pending) throw fail(400, "OTP expired. Ask for a new one");
    if (pending.attempts >= MAX_ATTEMPTS) throw fail(429, "Too many wrong tries. Ask for a new OTP");

    let ok = false;
    if (pending.via === "msg91") {
      try {
        const r = await verifySmsOtp(mobile, code);
        ok = r?.type === "success";
      } catch (e) {
        console.error("[online-admission] OTP verify failed", e?.response?.data || e?.message);
      }
    } else {
      ok = await bcrypt.compare(code, pending.codeHash || "");
    }
    if (!ok) {
      await Otp.updateOne({ _id: pending._id }, { $inc: { attempts: 1 } });
      throw fail(400, "Incorrect OTP");
    }
    await Otp.deleteMany({ mobile });

    const name = String(req.body?.name || "").trim().slice(0, 100) || null;
    let applicant = await Applicant.findOne({ mobile });
    if (applicant && !applicant.active) throw fail(403, "This account is disabled. Please call 0522-4029757");
    if (!applicant) applicant = await Applicant.create({ mobile, name });
    else if (!applicant.name && name) applicant.name = name;
    applicant.lastLoginAt = new Date();
    await applicant.save();

    const token = startApplicantSession(res, applicant);
    const user = { id: String(applicant._id), name: applicant.name, mobile: applicant.mobile };
    // The app keeps the token itself; the website relies on the httpOnly cookie.
    return req.headers["x-source"] === "app" ? { ok: true, user, token } : { ok: true, user };
  },
});
