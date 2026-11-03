// Payment receipt PDF for an admission, drawn with the site's invoice layout.
// Not stored in the course Invoice collection: the number is derived from the
// file's reference, so the same receipt can be rebuilt any time.
import { generateInvoicePdf } from "@/lib/invoicePdf";
import { PACKAGES, streamInfo } from "@/lib/onlineAdmission/config";

export function receiptNumber(app) {
  return `NIOS-${app.ref_no}`;
}

/** app: plain application with `form`; pay: the paid Payment; mobile: login mobile. */
export function buildReceipt(app, pay, mobile) {
  const si = streamInfo(app);
  return generateInvoicePdf({
    invoiceNumber: receiptNumber(app),
    issuedAt: pay.paid_at || new Date(),
    status: "paid",
    studentName: app.form?.full_name || "Student",
    studentPhone: mobile || app.form?.mobile || "",
    studentEmail: app.form?.email || "",
    courseTitle: `NIOS complete package, ${PACKAGES[app.class]?.label || `Class ${app.class}th`}`,
    courseSubject: `Admission ${app.ref_no}`,
    courseBatch: si ? `${si.label}, ${si.exam} exam` : "",
    orderId: pay.order_id?.startsWith("offline_") ? "" : pay.order_id,
    paymentId: pay.payment_id || "",
    subtotal: pay.amount,
    discount: 0,
    tax: 0,
    total: pay.amount,
  });
}
