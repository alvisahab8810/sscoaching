// The student's payment receipt (PDF).
import Payment from "@/models/onlineAdmission/Payment";
import { route, fail, ownApplication, plain } from "@/lib/onlineAdmission/server";
import { buildReceipt, receiptNumber } from "@/lib/onlineAdmission/receipt";

export default route({
  async GET(req, res) {
    const { applicant, app } = await ownApplication(req);
    const pay = await Payment.findOne({ application: app._id, status: "paid" }).sort({ paid_at: -1 }).lean();
    if (!pay) throw fail(404, "No payment yet");
    const pdf = await buildReceipt(plain(app), pay, applicant.mobile);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${receiptNumber(app)}.pdf"`);
    res.setHeader("Cache-Control", "private, no-store");
    res.status(200).send(pdf);
  },
});
