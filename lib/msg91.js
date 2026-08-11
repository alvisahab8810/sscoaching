import axios from "axios";

const AUTH_KEY   = process.env.MSG91_AUTH_KEY;
const BASE = "https://control.msg91.com/api/v5/otp";

function mobile(phone) {
  // Ensure 91XXXXXXXXXX format
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
}

// templateId: pass the purpose-specific MSG91 widget template id
// (signup uses MSG91_TEMPLATE_ID, forgot-password uses MSG91_FORGOT_TEMPLATE_ID)
export async function sendSmsOtp(phone, templateId = process.env.MSG91_TEMPLATE_ID) {
  const res = await axios.post(
    BASE,
    { template_id: templateId, mobile: mobile(phone), otp_expiry: 10 },
    { headers: { authkey: AUTH_KEY, "Content-Type": "application/json" } }
  );
  console.log("[MSG91 RAW RESPONSE]", JSON.stringify(res.data));
  return res.data; // { type: "success", message: "3575685..." }
}

export async function verifySmsOtp(phone, otp) {
  const res = await axios.get(
    `${BASE}/verify`,
    { params: { otp, mobile: mobile(phone) }, headers: { authkey: AUTH_KEY } }
  );
  return res.data; // { type: "success", message: "OTP verified successfully" }
}

export async function resendSmsOtp(phone) {
  const res = await axios.get(
    `${BASE}/retry`,
    { params: { retrytype: "text", mobile: mobile(phone) }, headers: { authkey: AUTH_KEY } }
  );
  return res.data;
}
