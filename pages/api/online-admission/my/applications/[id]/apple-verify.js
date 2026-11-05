// iOS app: records an Apple In-App Purchase of the admission package. Android
// and the website keep using Razorpay through pay + pay-verify.
//
// Body: { signedTransaction: "<StoreKit 2 JWS>" }
// The package is a Consumable product per class (in.sscoaching.app.nios_10 /
// nios_12), tied to the applicant through appAccountToken. The order id is
// "apple:<transactionId>", so a retry of the same purchase is a no-op.
import Payment from "@/models/onlineAdmission/Payment";
import { BUNDLE_ID, accountTokenForStudent, verifySignedTransaction } from "@/lib/appleIap";
import {
  route, fail, ownApplication, markPaid, studentActor, studentView,
} from "@/lib/onlineAdmission/server";

const admissionProductId = (cls) => `${BUNDLE_ID}.nios_${cls}`;

export default route({
  async POST(req) {
    const { applicant, app } = await ownApplication(req);

    let tx;
    try {
      tx = verifySignedTransaction(req.body?.signedTransaction);
    } catch {
      throw fail(400, "Could not verify the purchase with Apple");
    }
    if (tx.bundleId !== BUNDLE_ID) throw fail(400, "Purchase is for another app");
    if (tx.productId !== admissionProductId(app.class)) throw fail(400, "This purchase is not for this package");
    if (tx.revocationDate) throw fail(400, "This purchase was refunded");
    if (String(tx.appAccountToken || "").toLowerCase() !== accountTokenForStudent(applicant._id))
      throw fail(403, "This purchase belongs to another account");

    const orderId = `apple:${tx.transactionId}`;
    const existing = await Payment.findOne({ order_id: orderId });
    if (existing && String(existing.application) !== String(app._id))
      throw fail(409, "This purchase is already used for another application");
    if (!existing) {
      // Apple has already taken the money, so it is always recorded; markPaid
      // holds it for staff review if the file is no longer "verified".
      // Apple reports price in milli-units of the storefront currency
      const amount = tx.currency === "INR" && tx.price ? Math.round(tx.price / 1000) : app.price;
      try {
        await Payment.create({ application: app._id, amount, gateway: "apple", order_id: orderId });
      } catch (e) {
        if (e.code !== 11000) throw e;
      }
    }

    await markPaid(orderId, String(tx.transactionId), studentActor(applicant), `apple in-app purchase (${tx.environment || "Production"})`);
    const { app: fresh } = await ownApplication(req);
    return studentView(fresh);
  },
});
