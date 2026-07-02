import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import jwt from "jsonwebtoken";

function getStudentId(req) {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch { return null; }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const studentId = getStudentId(req);
  if (!studentId) return res.status(401).json({ success: false });

  const { token } = req.body || {};
  if (!token) return res.status(400).json({ success: false });

  await StudentUser.findByIdAndUpdate(studentId, { expoPushToken: token });
  return res.json({ success: true });
}
