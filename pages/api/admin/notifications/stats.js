import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import jwt from "jsonwebtoken";

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
  if (req.method !== "GET") return res.status(405).end();
  await dbConnect();
  if (!verifyAdmin(req)) return res.status(401).json({ success: false });

  const total = await StudentUser.countDocuments();
  const withToken = await StudentUser.countDocuments({
    expoPushToken: { $exists: true, $ne: "", $ne: null },
  });

  // Last 5 saved tokens (for debug)
  const samples = await StudentUser.find(
    { expoPushToken: { $exists: true, $ne: "" } },
    { name: 1, phone: 1, expoPushToken: 1 }
  ).sort({ updatedAt: -1 }).limit(5).lean();

  return res.json({ success: true, total, withToken, samples });
}
