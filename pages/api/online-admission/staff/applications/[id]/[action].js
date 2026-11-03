// Consultant actions on one admission file. Each action enforces the same
// gates as the approved prototype (payment only after verification, NIOS
// submission only after a centre and the full checklist, and so on).
import Application from "@/models/onlineAdmission/Application";
import Payment from "@/models/onlineAdmission/Payment";
import { CHECKLIST, STATUS_BY_KEY, docSlots } from "@/lib/onlineAdmission/config";
import { validateForSubmit } from "@/lib/onlineAdmission/validate";
import { findCentre, offersCourse } from "@/lib/onlineAdmission/centres";
import {
  route, fail, requireStaff, staffApplication, staffView, setStatus, claim, addEvent, staffActor,
  parseMultipart, storeFile, currentDocs, plain, markPaid, money,
} from "@/lib/onlineAdmission/server";
import { mailStudent } from "@/lib/onlineAdmission/mail";

export const config = { api: { bodyParser: false } };

async function readBody(req) {
  if (String(req.headers["content-type"] || "").startsWith("multipart/form-data")) return parseMultipart(req);
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 100_000) throw fail(413, "Request too large");
  }
  try {
    return { fields: raw ? JSON.parse(raw) : {}, file: null };
  } catch {
    throw fail(400, "Invalid request");
  }
}

const text = (v) => String(v ?? "").trim();

const ACTIONS = {
  async claim(app, staff) {
    app.consultant = { id: staff.id, name: staff.name };
    await app.save();
    await addEvent(app, staffActor(staff), "assigned", `Assigned to ${staff.name}`, false);
  },

  async "request-changes"(app, staff, b) {
    const note = text(b.note);
    if (!note) throw fail(400, "Tell the student what to correct");
    setStatus(app, "changes_requested");
    app.review_note = note;
    claim(app, staff);
    await app.save();
    await addEvent(app, staffActor(staff), "changes_requested", "Corrections needed: " + note);
    await mailStudent(app, "changes_requested", { note });
  },

  async verify(app, staff) {
    const docs = await currentDocs(app);
    const pending = docSlots(plain(app)).filter((s) => {
      const d = docs.find((x) => x.type === s.type);
      return (s.required || d) && (!d || d.status !== "approved");
    });
    if (pending.length) throw fail(409, "Approve every document first: " + pending.map((x) => x.label).join(", "));
    const { errors } = validateForSubmit(plain(app), docs);
    if (Object.keys(errors).length) throw fail(409, "The form still has problems: " + Object.values(errors).join("; "));
    setStatus(app, "verified");
    app.verified_at = new Date();
    app.review_note = null;
    claim(app, staff);
    await app.save();
    await addEvent(app, staffActor(staff), "verified", `Documents and details verified. Payment link unlocked (${money(app.price)})`);
    await mailStudent(app, "verified");
  },

  async "offline-payment"(app, staff, b, file) {
    if (!staff.isAdmin) throw fail(403, "Only the main admin can record an offline payment");
    if (app.status !== "verified") throw fail(409, "Payments can be recorded only after verification");
    const reference = text(b.reference);
    if (!reference) throw fail(400, "Enter the receipt / UTR number");
    const order_id = `offline_${app._id}_${Date.now().toString(36)}`;
    await Payment.create({ application: app._id, amount: app.price, gateway: "offline", order_id });
    if (file) await storeFile(app, file, "offline_payment_receipt", { byStaff: true });
    await markPaid(order_id, reference, staffActor(staff), "offline: " + text(b.mode));
  },

  async centre(app, staff, b) {
    const c = await findCentre(text(b.code));
    if (!c) throw fail(404, "Centre code not found in the NIOS list");
    if (!["paid", "form_in_progress"].includes(app.status)) throw fail(409, "Allot a centre after the payment is received");
    if (!offersCourse(c, app.class)) throw fail(409, `${c.name} does not offer Class ${app.class}th`);
    if (app.status === "paid") setStatus(app, "form_in_progress");
    app.centre_code = c.code;
    claim(app, staff);
    await app.save();
    await addEvent(app, staffActor(staff), "centre", `Study centre allotted: ${c.name} (${c.code}), ${c.district}`);
    await mailStudent(app, "centre", c);
  },

  async checklist(app, staff, b) {
    if (!CHECKLIST.some((c) => c.key === b.key)) throw fail(400, "Unknown checklist item");
    if (!["paid", "form_in_progress"].includes(app.status)) throw fail(409, "The checklist is used while filling the NIOS form");
    const list = { ...(app.checklist || {}) };
    if (b.done) list[b.key] = { by: staff.name, at: new Date() };
    else delete list[b.key];
    app.checklist = list;
    app.markModified("checklist");
    await app.save();
  },

  async "nios-submitted"(app, staff, b, file) {
    if (app.status !== "form_in_progress") throw fail(409, "Allot a study centre and fill the NIOS form first");
    if (CHECKLIST.some((c) => !app.checklist?.[c.key])) throw fail(409, "Finish the checklist first");
    const ref = text(b.nios_ref);
    if (ref.length < 4) throw fail(400, "Enter the NIOS reference / application number");
    if (file) await storeFile(app, file, "nios_receipt", { byStaff: true });
    setStatus(app, "submitted_to_nios");
    app.nios_ref = ref.slice(0, 60);
    app.nios_submitted_at = new Date();
    await app.save();
    await addEvent(app, staffActor(staff), "nios_submitted", `NIOS admission form submitted (reference ${app.nios_ref})`);
    await mailStudent(app, "nios_submitted");
  },

  async enrollment(app, staff, b) {
    if (app.status !== "submitted_to_nios") throw fail(409, "Enrollment number is added after the form is submitted to NIOS");
    const no = String(b.enrollment_no || "").replace(/\s/g, "");
    if (!/^\d{12}$/.test(no)) throw fail(400, "NIOS enrollment numbers have 12 digits");
    if (await Application.exists({ enrollment_no: no, _id: { $ne: app._id } })) {
      throw fail(409, "This enrollment number is already saved on another file");
    }
    setStatus(app, "enrolled");
    app.enrollment_no = no;
    app.enrolled_at = new Date();
    await app.save();
    await addEvent(app, staffActor(staff), "enrolled", `NIOS enrollment number issued: ${no}`);
    await mailStudent(app, "enrolled");
  },

  async "exam-fee"(app, staff, b, file) {
    if (app.status !== "enrolled") throw fail(409, "Exam fee is submitted after enrollment");
    const fee = {
      session: text(b.session).slice(0, 60),
      amount: +b.amount || 0,
      receipt_no: text(b.receipt_no).slice(0, 60),
      paid_on: /^\d{4}-\d{2}-\d{2}$/.test(text(b.paid_on)) ? text(b.paid_on) : new Date().toISOString().slice(0, 10),
    };
    if (!fee.session || !fee.receipt_no || !(fee.amount > 0)) throw fail(400, "Enter exam session, amount and NIOS receipt number");
    if (file) await storeFile(app, file, "exam_fee_receipt", { byStaff: true });
    setStatus(app, "exam_fee_paid");
    app.exam_fee = fee;
    app.exam_fee_at = new Date();
    await app.save();
    await addEvent(app, staffActor(staff), "exam_fee", `Exam fee submitted to NIOS for ${fee.session} (receipt ${fee.receipt_no})`);
    await mailStudent(app, "exam_fee");
  },

  async "step-back"(app, staff, b) {
    const back = { form_in_progress: "paid", submitted_to_nios: "form_in_progress", verified: "changes_requested" }[app.status];
    if (!back) throw fail(409, "Nothing to undo at this stage");
    const reason = text(b.reason);
    if (!reason) throw fail(400, "Give a reason");
    setStatus(app, back);
    if (back === "changes_requested") app.review_note = reason;
    await app.save();
    await addEvent(app, staffActor(staff), "step_back", `Moved back to "${STATUS_BY_KEY[back].label}": ${reason}`, back === "changes_requested");
    if (back === "changes_requested") await mailStudent(app, "changes_requested", { note: reason });
  },

  async note(app, staff, b) {
    const message = text(b.message);
    if (!message) throw fail(400, "Empty note");
    await addEvent(app, staffActor(staff), "note", message.slice(0, 2000), !!b.share);
  },
};

export default route({
  async POST(req) {
    const staff = requireStaff(req);
    const action = ACTIONS[req.query.action];
    if (!action) throw fail(404, "Not found");
    const app = await staffApplication(req);
    const { fields, file } = await readBody(req);
    await action(app, staff, fields || {}, file);
    return staffView(await Application.findById(app._id));
  },
});
