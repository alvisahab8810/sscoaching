// "Notify me when admissions open" sign-up from the landing page.
import Interest from "@/models/onlineAdmission/Interest";
import { route, fail, digits, isMobile } from "@/lib/onlineAdmission/server";

export default route({
  async POST(req) {
    const b = req.body || {};
    const mobile = digits(b.mobile);
    if (!isMobile(mobile)) throw fail(400, "Enter a valid mobile number");
    const pincode = digits(b.pincode).slice(0, 6);
    if (pincode && !/^[1-9]\d{5}$/.test(pincode)) throw fail(400, "Enter a 6-digit pincode or leave it empty");
    const cls = ["10", "12"].includes(String(b.class)) ? String(b.class) : "";
    // One row per mobile and class: a second tap only refreshes the details.
    await Interest.findOneAndUpdate(
      { mobile, class: cls },
      { $set: { name: String(b.name || "").trim().slice(0, 100), pincode } },
      { upsert: true }
    );
    return { ok: true };
  },
});
