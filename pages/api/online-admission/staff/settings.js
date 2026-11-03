import Settings from "@/models/onlineAdmission/Settings";
import { route, fail, requireStaff, getSettings } from "@/lib/onlineAdmission/server";

export default route({
  async GET(req) {
    requireStaff(req, { adminOnly: true });
    const s = await getSettings();
    return {
      launch_mode: s.launch_mode, price_10: s.price_10, price_12: s.price_12, centres_synced_at: s.centres_synced_at,
      test_card: s.test_card === true, test_price: s.test_price ?? 1,
      payment_mode: process.env.RAZORPAY_KEY_ID ? "razorpay" : "off",
      sms_mode: process.env.MSG91_SMS_OTP_ENABLED === "true" ? "msg91" : "off",
    };
  },

  async PUT(req) {
    requireStaff(req, { adminOnly: true });
    const b = req.body || {};
    const set = {};
    if (b.launch_mode) set.launch_mode = b.launch_mode === "live" ? "live" : "coming_soon";
    for (const k of ["price_10", "price_12"]) {
      if (b[k] != null && b[k] !== "") {
        const v = Math.round(+b[k]);
        if (!(v > 0)) throw fail(400, "Invalid price");
        set[k] = v;
      }
    }
    if (b.test_price != null && b.test_price !== "") {
      const v = Math.round(+b.test_price);
      if (!(v >= 1)) throw fail(400, "Test price must be at least ₹1");
      set.test_price = v;
    }
    if (typeof b.test_card === "boolean") set.test_card = b.test_card;
    await getSettings();
    await Settings.updateOne({ _id: "main" }, { $set: set });
    return { ok: true };
  },
});
