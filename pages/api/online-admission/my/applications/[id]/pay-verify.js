// Called by the checkout success handler. Checks Razorpay's signature, then
// records the payment (markPaid is idempotent with the reconcile safety net).
import crypto from "crypto";
import Payment from "@/models/onlineAdmission/Payment";
import {
  route, fail, ownApplication, markPaid, studentActor, studentView,
} from "@/lib/onlineAdmission/server";

export default route({
  async POST(req) {
    const { applicant, app } = await ownApplication(req);
    const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body || {};
    if (!orderId || !paymentId || !signature) throw fail(400, "Payment details missing");

    const pay = await Payment.findOne({ order_id: orderId, application: app._id });
    if (!pay) throw fail(404, "Order not found");

    const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(`${orderId}|${paymentId}`).digest("hex");
    const a = Buffer.from(expected);
    const b = Buffer.from(String(signature));
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) throw fail(400, "Payment verification failed");

    await markPaid(orderId, paymentId, studentActor(applicant), "razorpay checkout");
    const { app: fresh } = await ownApplication(req);
    return studentView(fresh);
  },
});
