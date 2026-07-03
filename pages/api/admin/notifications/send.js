import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import jwt from "jsonwebtoken";
import axios from "axios";

function verifyAdmin(req) {
  try {
    const adminToken = req.cookies?.admin_token;
    if (adminToken) { jwt.verify(adminToken, process.env.JWT_SECRET); return true; }
    const subToken = req.cookies?.subadmin_token;
    if (subToken) { const d = jwt.verify(subToken, process.env.JWT_SECRET); return d.role === "subadmin"; }
    return false;
  } catch { return false; }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();
  if (!verifyAdmin(req)) return res.status(401).json({ success: false, message: "Unauthorized" });

  const { title, body, data = {}, target = "all", studentIds = [] } = req.body || {};
  const notifData = { screen: 'Notifications', ...data };

  if (!title || !body)
    return res.status(400).json({ success: false, message: "Title and body are required" });

  // Get push tokens
  let query = { expoPushToken: { $ne: "" } };
  if (target === "selected" && studentIds.length > 0) {
    query._id = { $in: studentIds };
  }

  const students = await StudentUser.find(query).select("expoPushToken name").lean();
  const tokens = students.map(s => s.expoPushToken).filter(Boolean);

  if (tokens.length === 0)
    return res.status(200).json({ success: true, sent: 0, message: "No students with push tokens" });

  // Send via Expo Push API (batches of 100)
  const BATCH = 100;
  let totalSent = 0;
  let errors = 0;

  for (let i = 0; i < tokens.length; i += BATCH) {
    const batch = tokens.slice(i, i + BATCH).map(to => ({
      to, title, body, data: notifData,
      sound: "default",
      priority: "high",
      channelId: "default",
    }));

    try {
      const result = await axios.post(
        "https://exp.host/--/api/v2/push/send",
        batch,
        { headers: { "Content-Type": "application/json", "Accept": "application/json", "Accept-Encoding": "gzip, deflate" } }
      );
      const tickets = result.data?.data || [];
      totalSent += tickets.filter(t => t.status === "ok").length;
      errors   += tickets.filter(t => t.status === "error").length;
    } catch (err) {
      console.error("Expo push error:", err?.response?.data || err.message);
      errors += batch.length;
    }
  }

  return res.json({ success: true, sent: totalSent, errors, total: tokens.length });
}
