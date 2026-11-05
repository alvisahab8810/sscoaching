// Server-side helpers for the NIOS online admission: API wrapper, the
// student (applicant) session, staff access, settings, timeline events,
// file storage and the student / staff views of an application.
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import formidable from "formidable";
import Razorpay from "razorpay";
import dbConnect from "@/lib/dbConnect";
import { mailStaff, mailStudent } from "@/lib/onlineAdmission/mail";
import { requireAdminApi } from "@/lib/requireAdminApi";
import Applicant from "@/models/onlineAdmission/Applicant";
import Application from "@/models/onlineAdmission/Application";
import Document from "@/models/onlineAdmission/Document";
import Payment from "@/models/onlineAdmission/Payment";
import Event from "@/models/onlineAdmission/Event";
import Settings from "@/models/onlineAdmission/Settings";
import {
  SUBJECTS, docSlots, STATUS_BY_KEY, TRANSITIONS, CHECKLIST, EDITABLE, streamInfo,
} from "@/lib/onlineAdmission/config";
import { checkSubjects, validateForSubmit } from "@/lib/onlineAdmission/validate";
import { findCentre } from "@/lib/onlineAdmission/centres";

// ---------- API wrapper ----------

export class HttpError extends Error {
  constructor(status, message, extra) {
    super(message);
    this.status = status;
    this.extra = extra || null;
  }
}
export const fail = (status, message, extra) => new HttpError(status, message, extra);

/** route({ GET, POST, ... }): connects the DB, maps thrown HttpErrors to JSON. */
export function route(handlers) {
  return async (req, res) => {
    const fn = handlers[req.method];
    if (!fn) return res.status(405).json({ error: "Method not allowed" });
    try {
      await dbConnect();
      const out = await fn(req, res);
      if (out !== undefined && !res.headersSent) res.status(200).json(out);
    } catch (e) {
      if (e instanceof HttpError) return res.status(e.status).json({ error: e.message, ...(e.extra || {}) });
      console.error("[online-admission]", e);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
}

export const isMobile = (m) => /^[6-9]\d{9}$/.test(String(m || ""));
export const digits = (v) => String(v || "").replace(/\D/g, "");
export const money = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

// ---------- student (applicant) session ----------

const APPLICANT_COOKIE = "oa_token";
const SESSION_DAYS = 30;

function cookieOpts(maxAge) {
  return { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge };
}

export function startApplicantSession(res, applicant) {
  const token = jwt.sign({ aid: String(applicant._id), kind: "online_admission" }, process.env.JWT_SECRET, {
    expiresIn: `${SESSION_DAYS}d`,
  });
  res.setHeader("Set-Cookie", cookie.serialize(APPLICANT_COOKIE, token, cookieOpts(SESSION_DAYS * 86400)));
  return token;
}

export function endApplicantSession(res) {
  res.setHeader("Set-Cookie", cookie.serialize(APPLICANT_COOKIE, "", cookieOpts(0)));
}

export async function getApplicant(req) {
  // The mobile app has no cookie jar: it sends the same token as a header, or
  // as ?oa_token= when it opens a file or receipt in a viewer.
  const token = req.cookies?.[APPLICANT_COOKIE] || req.headers["x-oa-token"] ||
    (req.method === "GET" ? req.query?.oa_token : null);
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.kind !== "online_admission") return null;
    const a = await Applicant.findById(decoded.aid);
    return a && a.active ? a : null;
  } catch {
    return null;
  }
}

export async function requireApplicant(req) {
  const a = await getApplicant(req);
  if (!a) throw fail(401, "Please log in");
  return a;
}

/** The applicant's own application, or 404 (never reveals other files). */
export async function ownApplication(req) {
  const applicant = await requireApplicant(req);
  const id = String(req.query.id || "");
  const app = /^[a-f\d]{24}$/i.test(id) ? await Application.findById(id) : null;
  if (!app || String(app.applicant) !== String(applicant._id)) throw fail(404, "Application not found");
  return { applicant, app };
}

// ---------- staff (admin / sub-admin with the "admissions" permission) ----------

export function requireStaff(req, { adminOnly = false } = {}) {
  const s = requireAdminApi(req, "admissions");
  if (!s) {
    const loggedIn = req.cookies?.admin_token || req.cookies?.subadmin_token;
    throw fail(loggedIn ? 403 : 401, loggedIn ? "You do not have access to online admissions" : "Please log in");
  }
  if (adminOnly && s.role !== "super") throw fail(403, "Only the main admin can do this");
  return {
    id: String(s.id),
    name: s.role === "super" ? "Admin" : s.name || s.username || "Consultant",
    isAdmin: s.role === "super",
  };
}

export async function staffApplication(req) {
  const id = String(req.query.id || "");
  const app = /^[a-f\d]{24}$/i.test(id) ? await Application.findById(id) : null;
  if (!app) throw fail(404, "Application not found");
  return app;
}

// ---------- settings ----------

export async function getSettings() {
  return Settings.findOneAndUpdate(
    { _id: "main" },
    { $setOnInsert: { _id: "main" } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();
}

// ---------- status machine + events ----------

export function setStatus(app, status) {
  if (!(TRANSITIONS[app.status] || []).includes(status)) {
    throw fail(409, `Cannot move from "${STATUS_BY_KEY[app.status].label}" to "${STATUS_BY_KEY[status].label}"`);
  }
  app.status = status;
}

/** Assign the file to this consultant if nobody has it yet. */
export function claim(app, staff) {
  if (!app.consultant?.id) app.consultant = { id: staff.id, name: staff.name };
}

/** actor: { role: "student"|"staff"|"system", name } */
export function addEvent(app, actor, type, message, visible = true) {
  return Event.create({
    application: app._id,
    actor_role: actor?.role || "system",
    actor_name: actor?.name || null,
    type,
    message,
    visible_to_student: visible,
  });
}
export const studentActor = (applicant) => ({ role: "student", name: applicant.name || applicant.mobile });
export const staffActor = (staff) => ({ role: "staff", name: staff.name });

// ---------- files ----------

const UPLOAD_DIR = process.env.ONLINE_ADMISSION_UPLOAD_DIR || path.join(process.cwd(), "private-uploads", "online-admission");
const MAX_FILE = 5 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ANY_TYPES = [...IMAGE_TYPES, "application/pdf"];

export const filePath = (storedName) => path.join(UPLOAD_DIR, path.basename(storedName));

/** Parses a multipart request. Returns { fields, file } (file may be null). */
export async function parseMultipart(req) {
  const form = formidable({ maxFileSize: MAX_FILE, maxFiles: 1, keepExtensions: true, allowEmptyFiles: false, minFileSize: 1 });
  try {
    const [fields, files] = await form.parse(req);
    const one = (v) => (Array.isArray(v) ? v[0] : v);
    const flat = Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, one(v)]));
    const file = one(files.file) || null;
    return { fields: flat, file };
  } catch (e) {
    if (e?.httpCode === 413 || /maxFileSize/i.test(e?.message || "")) throw fail(400, "File is larger than 5 MB");
    throw fail(400, "Could not read the upload. Try again");
  }
}

/** Stores an uploaded file as a new current document of `type`. */
export async function storeFile(app, file, type, { byStaff = false, accept = "any" } = {}) {
  const mime = file.mimetype || "";
  const allowed = accept === "image" ? IMAGE_TYPES : ANY_TYPES;
  if (!allowed.includes(mime)) {
    fs.promises.unlink(file.filepath).catch(() => {});
    throw fail(400, accept === "image" ? "Upload a JPG, PNG or WebP image" : "Upload an image (JPG/PNG) or a PDF");
  }
  if (file.size > MAX_FILE) throw fail(400, "File is larger than 5 MB");

  await fs.promises.mkdir(UPLOAD_DIR, { recursive: true });
  const ext = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "application/pdf": ".pdf" }[mime];
  const stored = `${app._id}_${type}_${Date.now()}${ext}`;
  // copy + unlink rather than rename: the temp dir can be on another drive.
  await fs.promises.copyFile(file.filepath, filePath(stored));
  fs.promises.unlink(file.filepath).catch(() => {});

  await Document.updateMany({ application: app._id, type }, { $set: { current: false } });
  return Document.create({
    application: app._id,
    type,
    mime,
    original_name: String(file.originalFilename || type).slice(0, 120),
    size: file.size,
    stored_name: stored,
    status: byStaff ? "approved" : "pending",
    by_staff: byStaff,
    reviewed_at: byStaff ? new Date() : null,
  });
}

// ---------- payments ----------

let razorpay = null;
export function getRazorpay() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) throw fail(503, "Online payment is not configured yet");
  if (!razorpay) razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
  return razorpay;
}

/**
 * Marks an order paid. Idempotent: a second call for the same order is a
 * no-op. Money that lands when the file is no longer "verified" is kept on
 * record but does not move the file; it is flagged for staff review.
 */
export async function markPaid(orderId, paymentId, actor, note) {
  const pay = await Payment.findOneAndUpdate(
    { order_id: orderId, status: { $ne: "paid" } },
    { $set: { status: "paid", payment_id: paymentId, paid_at: new Date(), note: note || null } },
    { new: true }
  );
  if (!pay) return; // unknown order or already paid
  const app = await Application.findOneAndUpdate(
    { _id: pay.application, status: "verified" },
    { $set: { status: "paid", paid_at: new Date() } },
    { new: true }
  );
  if (!app) {
    const current = await Application.findById(pay.application).select("status");
    await addEvent({ _id: pay.application }, actor, "payment_held",
      `Payment ${paymentId} received while status was "${current?.status}" — held for review`, false);
    return;
  }
  await addEvent(app, actor, "paid", `Payment of ${money(pay.amount)} received (${pay.gateway}, ${paymentId})`);
  const student = await Applicant.findById(app.applicant).select("mobile").lean();
  await mailStudent(plain(app), "paid", { amount: pay.amount, payment_id: paymentId, payment: pay.toObject(), mobile: student?.mobile });
  await mailStaff(app, `Payment of ${money(pay.amount)} received`);
}

/**
 * Safety net for a student who paid and closed the page before the browser
 * confirmed it: asks Razorpay about this file's open orders and records any
 * captured payment. Runs only while the file waits for payment.
 */
export async function reconcileRazorpay(app) {
  if (app.status !== "verified" || !process.env.RAZORPAY_KEY_SECRET) return false;
  const open = await Payment.find({
    application: app._id, gateway: "razorpay", status: "created",
    created_at: { $gt: new Date(Date.now() - 7 * 86400e3) },
  }).sort({ created_at: -1 }).limit(3);
  let paid = false;
  for (const p of open) {
    try {
      const { items = [] } = await getRazorpay().orders.fetchPayments(p.order_id);
      const ok = items.find((x) => x.status === "captured");
      if (ok) {
        await markPaid(p.order_id, ok.id, { role: "system", name: "Razorpay" }, "confirmed with Razorpay");
        paid = true;
      }
    } catch (e) {
      console.error("[online-admission] reconcile", p.order_id, e?.message);
    }
  }
  return paid;
}

// ---------- views ----------

const EXTRA_DOC_TYPES = ["nios_receipt", "exam_fee_receipt", "offline_payment_receipt"];
const CENTRE_VISIBLE = ["form_in_progress", "submitted_to_nios", "enrolled", "exam_fee_paid"];
const maskAadhaar = (a) => {
  a = digits(a);
  return a ? "XXXX XXXX " + a.slice(-4) : "";
};

export function docView(d) {
  return {
    id: String(d._id), type: d.type, mime: d.mime, original_name: d.original_name, size: d.size,
    status: d.status, remark: d.remark, current: d.current, uploaded_at: d.uploaded_at, reviewed_at: d.reviewed_at,
    url: `/api/online-admission/files/${d._id}`,
  };
}

/** Plain object the config/validate helpers expect. */
export function plain(app) {
  const o = typeof app.toObject === "function" ? app.toObject() : app;
  return { ...o, id: String(o._id), form: o.form || {}, subjects: o.subjects || [], checklist: o.checklist || {} };
}

async function base(app, { allDocs }) {
  const a = plain(app);
  const docs = (await Document.find({ application: a._id, ...(allDocs ? {} : { current: true }) }).sort({ uploaded_at: -1 }).lean()).map(docView);
  return { a, docs };
}

export async function studentView(app) {
  const { a, docs } = await base(app, { allDocs: false });
  const slots = docSlots(a).map((s) => ({ ...s, doc: docs.find((d) => d.type === s.type) || null }));
  const events = await Event.find({ application: a._id, visible_to_student: true }).sort({ created_at: 1 }).lean();
  const centre = a.centre_code && CENTRE_VISIBLE.includes(a.status) ? await findCentre(a.centre_code) : null;
  const payment = await Payment.findOne({ application: a._id, status: "paid" }).sort({ paid_at: -1 }).lean();
  const editable = EDITABLE.includes(a.status);
  const form = { ...a.form, aadhaar_masked: maskAadhaar(a.form.aadhaar) };
  if (!editable) delete form.aadhaar;
  return {
    id: a.id, ref_no: a.ref_no, class: a.class, stream: a.stream, block: a.block, status: a.status, price: a.price,
    form, subjects: a.subjects, nios_ref: a.nios_ref, enrollment_no: a.enrollment_no, exam_fee: a.exam_fee,
    review_note: a.review_note, created_at: a.created_at, updated_at: a.updated_at, submitted_at: a.submitted_at,
    verified_at: a.verified_at, paid_at: a.paid_at, enrolled_at: a.enrolled_at,
    status_info: STATUS_BY_KEY[a.status], stream_info: streamInfo(a), slots,
    events: events.map((e) => ({ type: e.type, message: e.message, created_at: e.created_at })),
    centre, payment: payment ? { amount: payment.amount, gateway: payment.gateway, payment_id: payment.payment_id, paid_at: payment.paid_at } : null,
    subject_check: checkSubjects(a), editable,
  };
}

export async function staffView(app) {
  const { a, docs } = await base(app, { allDocs: true });
  const current = docs.filter((d) => d.current);
  const slots = docSlots(a).map((s) => ({
    ...s,
    doc: current.find((d) => d.type === s.type) || null,
    history: docs.filter((d) => d.type === s.type && !d.current),
  }));
  const [student, events, payments, centre] = await Promise.all([
    Applicant.findById(a.applicant).lean(),
    Event.find({ application: a._id }).sort({ created_at: 1 }).lean(),
    Payment.find({ application: a._id }).sort({ created_at: -1 }).lean(),
    a.centre_code ? findCentre(a.centre_code) : null,
  ]);
  const { errors, warnings } = validateForSubmit(a, current);
  return {
    ...a, _id: undefined, applicant: undefined,
    student: student ? { id: String(student._id), name: student.name, mobile: student.mobile, created_at: student.createdAt } : null,
    consultant: a.consultant?.id ? { id: a.consultant.id, name: a.consultant.name } : null,
    slots, extra_docs: current.filter((d) => EXTRA_DOC_TYPES.includes(d.type)),
    events: events.map((e) => ({ id: String(e._id), type: e.type, message: e.message, actor_role: e.actor_role, actor_name: e.actor_name, visible_to_student: e.visible_to_student, created_at: e.created_at })),
    payments: payments.map((p) => ({ id: String(p._id), amount: p.amount, status: p.status, gateway: p.gateway, order_id: p.order_id, payment_id: p.payment_id, note: p.note, created_at: p.created_at, paid_at: p.paid_at })),
    centre,
    subjects_full: a.subjects.map((c) => (SUBJECTS[a.class] || []).find((s) => s.code === +c)).filter(Boolean),
    status_info: STATUS_BY_KEY[a.status], stream_info: streamInfo(a),
    checklist_def: CHECKLIST, validation: { errors, warnings }, next: TRANSITIONS[a.status],
  };
}

/** Current documents of an application, as validate.js expects them. */
export async function currentDocs(app) {
  return (await Document.find({ application: app._id, current: true }).lean()).map(docView);
}
