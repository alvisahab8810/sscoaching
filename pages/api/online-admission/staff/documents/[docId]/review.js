// Approve or reject one uploaded document.
import Document from "@/models/onlineAdmission/Document";
import Application from "@/models/onlineAdmission/Application";
import { docSlots } from "@/lib/onlineAdmission/config";
import { route, fail, requireStaff, claim, addEvent, staffActor, staffView } from "@/lib/onlineAdmission/server";
import { mailStudent } from "@/lib/onlineAdmission/mail";

export default route({
  async POST(req) {
    const staff = requireStaff(req);
    const id = String(req.query.docId || "");
    const d = /^[a-f\d]{24}$/i.test(id) ? await Document.findById(id) : null;
    if (!d) throw fail(404, "Document not found");
    const app = await Application.findById(d.application);
    if (!["submitted", "verified"].includes(app.status)) {
      throw fail(409, "Documents can be reviewed while the application is under verification");
    }
    if (!d.current) throw fail(409, "A newer version of this document was uploaded");

    const remark = String(req.body?.remark || "").trim().slice(0, 500);
    const status = req.body?.status === "approved" ? "approved" : "rejected";
    if (status === "rejected" && !remark) throw fail(400, "Write the reason so the student knows what to fix");
    d.status = status;
    d.remark = remark || null;
    d.reviewed_at = new Date();
    await d.save();

    // A rejected document reopens verification, so the payment link closes until it is fixed
    const reopened = status === "rejected" && app.status === "verified";
    if (reopened) {
      app.status = "submitted";
      app.verified_at = null;
    }
    claim(app, staff);
    app.updated_at = new Date();
    await app.save();
    const label = (docSlots(app.toObject()).find((s) => s.type === d.type) || { label: d.type }).label;
    await addEvent(app, staffActor(staff), "doc_" + status, `${label}: ${status}${remark ? " — " + remark : ""}`, false);
    if (status === "rejected") {
      await addEvent(app, staffActor(staff), "doc_reupload", `Please upload your ${label} again: ${remark}`);
      if (reopened) await addEvent(app, staffActor(staff), "reopened", "Back to verification until the document is fixed", false);
      await mailStudent(app, "doc_rejected", { label, remark });
    }
    return staffView(app);
  },
});
