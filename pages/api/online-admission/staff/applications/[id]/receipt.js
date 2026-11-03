// Staff copy of a file's payment receipt (PDF).
import Applicant from "@/models/onlineAdmission/Applicant";
import Payment from "@/models/onlineAdmission/Payment";
import { route, fail, requireStaff, staffApplication, plain } from "@/lib/onlineAdmission/server";
import { buildReceipt, receiptNumber } from "@/lib/onlineAdmission/receipt";

export default route({
  async GET(req, res) {
    requireStaff(req);
    const app = await staffApplication(req);
    const pay = await Payment.findOne({ application: app._id, status: "paid" }).sort({ paid_at: -1 }).lean();
    if (!pay) throw fail(404, "No payment on this file");
    const student = await Applicant.findById(app.applicant).select("mobile").lean();
    const pdf = await buildReceipt(plain(app), pay, student?.mobile);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${receiptNumber(app)}.pdf"`);
    res.setHeader("Cache-Control", "private, no-store");
    res.status(200).send(pdf);
  },
});
