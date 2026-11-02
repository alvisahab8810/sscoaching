// Browser helpers shared by the student pages and the consultant desk.
const BASE = "/api/online-admission";

/** Calls the admission API. Throws an Error carrying `status` and `errors`. */
export async function api(method, url, body) {
  const opt = { method, credentials: "same-origin", headers: {} };
  if (body instanceof FormData) opt.body = body;
  else if (body !== undefined && body !== null) {
    opt.body = JSON.stringify(body);
    opt.headers["content-type"] = "application/json";
  }
  let r;
  try {
    r = await fetch(BASE + url, opt);
  } catch {
    throw Object.assign(new Error("No internet connection. Try again"), { status: 0 });
  }
  const data = (r.headers.get("content-type") || "").includes("json") ? await r.json().catch(() => ({})) : null;
  if (!r.ok) {
    throw Object.assign(new Error(data?.error || "Request failed"), { status: r.status, errors: data?.errors });
  }
  return data;
}

export const rupee = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

export function when(s) {
  if (!s) return "";
  return new Date(s).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
}

export function dateOnly(s) {
  if (!s) return "";
  const d = new Date(String(s).length === 10 ? s + "T00:00:00" : s);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function loadScript(src) {
  return new Promise((res, rej) => {
    if (typeof window !== "undefined" && window.Razorpay && src.includes("razorpay")) return res();
    if (document.querySelector(`script[src="${src}"]`)) return res();
    const s = document.createElement("script");
    s.src = src;
    s.onload = res;
    s.onerror = () => rej(new Error("Could not load the payment window. Check your internet"));
    document.head.append(s);
  });
}

// Status pill colour, as in the approved prototype.
export const tone = (s) => ({
  changes_requested: "bad", verified: "lime", paid: "warn", form_in_progress: "warn",
  enrolled: "ok", exam_fee_paid: "ok", cancelled: "bad",
}[s] || "");

export const EXTRA_DOC_LABEL = {
  nios_receipt: "NIOS submission receipt",
  exam_fee_receipt: "Exam fee receipt",
  offline_payment_receipt: "Offline payment receipt",
};
