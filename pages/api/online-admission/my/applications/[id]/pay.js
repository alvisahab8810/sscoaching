// Creates a Razorpay order for the package. Only a verified file can pay.
import Payment from "@/models/onlineAdmission/Payment";
import { PACKAGES } from "@/lib/onlineAdmission/config";
import { route, fail, ownApplication, getRazorpay } from "@/lib/onlineAdmission/server";

export default route({
  async POST(req) {
    const { applicant, app } = await ownApplication(req);
    if (app.status !== "verified") throw fail(409, "Payment opens only after your documents are verified by our consultant");

    let order;
    try {
      order = await getRazorpay().orders.create({
        amount: Math.round(app.price * 100),
        currency: "INR",
        receipt: `${app.ref_no}_${Date.now().toString(36)}`.slice(0, 40),
        // `kind` keeps the course-purchase webhook from treating this as a course order.
        notes: { kind: "online_admission", applicationId: String(app._id), ref_no: app.ref_no },
      });
    } catch (e) {
      if (e?.status) throw e;
      console.error("[online-admission] razorpay order", e?.error || e?.message);
      throw fail(502, "Could not start the payment. Try again in a minute");
    }
    await Payment.create({ application: app._id, amount: app.price, gateway: "razorpay", order_id: order.id });

    return {
      mode: "razorpay",
      key_id: process.env.RAZORPAY_KEY_ID,
      order_id: order.id,
      amount: order.amount,
      currency: "INR",
      name: "SS Coaching",
      description: `NIOS complete package, ${PACKAGES[app.class].label} (${app.ref_no})`,
      prefill: { name: app.form?.full_name || applicant.name || "", contact: applicant.mobile, email: app.form?.email || "" },
    };
  },
});
