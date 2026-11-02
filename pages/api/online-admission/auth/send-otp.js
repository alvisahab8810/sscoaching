// NIOS online admission: send a login OTP to the student's mobile.
// MSG91 sends (and keeps) the code when MSG91_SMS_OTP_ENABLED=true; otherwise
// a code is generated here and, outside production, returned as dev_otp.
import bcrypt from "bcryptjs";
import { sendSmsOtp } from "@/lib/msg91";
import Otp from "@/models/onlineAdmission/Otp";
import { route, fail, digits, isMobile } from "@/lib/onlineAdmission/server";

const MSG91_ENABLED = process.env.MSG91_SMS_OTP_ENABLED === "true";
const TEMPLATE_ID = process.env.MSG91_ADMISSION_TEMPLATE_ID || process.env.MSG91_TEMPLATE_ID;

export default route({
  async POST(req) {
    const mobile = digits(req.body?.mobile);
    if (!isMobile(mobile)) throw fail(400, "Enter a valid 10-digit Indian mobile number");

    const recent = await Otp.findOne({ mobile, createdAt: { $gt: new Date(Date.now() - 45_000) } });
    if (recent) throw fail(429, "Please wait a few seconds before asking for another OTP");

    const expiresAt = new Date(Date.now() + 10 * 60_000);
    await Otp.deleteMany({ mobile });

    if (MSG91_ENABLED) {
      try {
        const r = await sendSmsOtp(mobile, TEMPLATE_ID);
        if (r?.type !== "success") throw new Error(r?.message || "MSG91 refused");
      } catch (e) {
        console.error("[online-admission] OTP send failed", e?.response?.data || e?.message);
        throw fail(502, "Could not send the OTP right now. Try again in a minute");
      }
      await Otp.create({ mobile, via: "msg91", expiresAt });
      return { ok: true };
    }

    const code = String(100000 + Math.floor(Math.random() * 900000));
    await Otp.create({ mobile, via: "local", codeHash: await bcrypt.hash(code, 8), expiresAt });
    if (process.env.NODE_ENV !== "production") return { ok: true, dev_otp: code };
    console.error("[online-admission] SMS OTP is switched off (MSG91_SMS_OTP_ENABLED); OTP for", mobile, "not delivered");
    throw fail(503, "OTP by SMS is not available right now. Please call 0522-4029757");
  },
});
