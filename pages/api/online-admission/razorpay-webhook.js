// Razorpay webhook for admission payments, so a student who pays and closes
// the browser is marked paid at once. markPaid is idempotent, so this, the
// checkout handler and the reconcile safety net can all fire for one payment.
//
// One-time setup in Razorpay Dashboard → Settings → Webhooks → Add new webhook:
//   URL:    https://sscoaching.in/api/online-admission/razorpay-webhook
//   Events: payment.captured, order.paid
//   Secret: the same value as RAZORPAY_WEBHOOK_SECRET
import crypto from "crypto";
import dbConnect from "@/lib/dbConnect";
import { getRazorpay, markPaid } from "@/lib/onlineAdmission/server";

export const config = { api: { bodyParser: false } };

async function rawBody(req) {
  let data = "";
  for await (const chunk of req) {
    data += chunk;
    if (data.length > 1_000_000) throw new Error("Body too large");
  }
  return data;
}

function signed(body, signature, secret) {
  if (!signature || !secret) return false;
  const a = Buffer.from(crypto.createHmac("sha256", secret).update(body).digest("hex"));
  const b = Buffer.from(String(signature));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return res.status(500).json({ error: "Webhook not configured" });

  const body = await rawBody(req);
  if (!signed(body, req.headers["x-razorpay-signature"], secret)) return res.status(400).json({ error: "Invalid signature" });

  let event;
  try {
    event = JSON.parse(body);
  } catch {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  if (!["payment.captured", "order.paid"].includes(event.event)) return res.status(200).json({ received: true });

  try {
    const payment = event.payload?.payment?.entity;
    if (!payment?.order_id) return res.status(200).json({ received: true });
    let notes = event.payload?.order?.entity?.notes;
    if (!notes?.kind) notes = (await getRazorpay().orders.fetch(payment.order_id))?.notes || {};
    // Course purchases have their own webhook
    if (notes.kind !== "online_admission") return res.status(200).json({ received: true, skipped: "not an admission" });

    await dbConnect();
    await markPaid(payment.order_id, payment.id, { role: "system", name: "Razorpay" }, "razorpay webhook");
    return res.status(200).json({ received: true });
  } catch (e) {
    console.error("[online-admission] webhook", e?.message);
    // 500 so Razorpay retries
    return res.status(500).json({ error: "Webhook processing failed" });
  }
}
