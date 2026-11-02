// One admission file of the logged-in student: read it, or save the form.
import Applicant from "@/models/onlineAdmission/Applicant";
import { currentBlock, EDITABLE } from "@/lib/onlineAdmission/config";
import { route, fail, ownApplication, studentView, reconcileRazorpay, digits } from "@/lib/onlineAdmission/server";

export default route({
  async GET(req) {
    let { app } = await ownApplication(req);
    if (await reconcileRazorpay(app)) ({ app } = await ownApplication(req));
    return studentView(app);
  },

  async PUT(req) {
    const { applicant, app } = await ownApplication(req);
    if (!EDITABLE.includes(app.status)) throw fail(409, "This application is locked while it is being processed");
    const b = req.body || {};

    const incoming = b.form && typeof b.form === "object" ? b.form : {};
    const form = { ...(app.form || {}), ...incoming, mobile: applicant.mobile };
    if (incoming.aadhaar === undefined) form.aadhaar = app.form?.aadhaar;
    if (form.aadhaar) form.aadhaar = digits(form.aadhaar).slice(0, 12);
    if (form.alt_mobile) form.alt_mobile = digits(form.alt_mobile).slice(0, 10);
    delete form.aadhaar_masked;

    app.stream = ["1", "2"].includes(String(b.stream)) ? String(b.stream) : app.stream;
    app.block = app.stream === "1" ? (["1", "2"].includes(String(b.block)) ? String(b.block) : app.block || currentBlock()) : null;
    if (Array.isArray(b.subjects)) app.subjects = b.subjects.map(Number).filter(Boolean).slice(0, 10);
    app.form = form;
    app.markModified("form");
    await app.save();

    if (form.full_name && !applicant.name) {
      await Applicant.updateOne({ _id: applicant._id }, { $set: { name: String(form.full_name).trim().slice(0, 100) } });
    }
    return studentView(app);
  },
});
