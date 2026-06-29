import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import jwt from "jsonwebtoken";

function getStudentId(req) {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "").trim();
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id || decoded._id || null;
  } catch { return null; }
}

export default async function handler(req, res) {
  await dbConnect();
  const studentId = getStudentId(req);
  if (!studentId) return res.status(401).json({ success: false, message: "Unauthorized" });

  // GET — return cart course IDs
  if (req.method === "GET") {
    const student = await StudentUser.findById(studentId).select("cart").lean();
    return res.status(200).json({ success: true, cart: student?.cart || [] });
  }

  // POST — add course to cart
  if (req.method === "POST") {
    const { courseId } = req.body;
    if (!courseId) return res.status(400).json({ success: false, message: "courseId required" });

    const student = await StudentUser.findById(studentId).select("cart");
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    if (!(student.cart || []).includes(courseId)) {
      student.cart = [...(student.cart || []), courseId];
      await student.save();
    }
    return res.status(200).json({ success: true, cart: student.cart });
  }

  // DELETE — remove course from cart (or clear all)
  if (req.method === "DELETE") {
    const { courseId } = req.body;
    const student = await StudentUser.findById(studentId).select("cart");
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    if (courseId) {
      student.cart = (student.cart || []).filter(id => id !== courseId);
    } else {
      student.cart = []; // clear entire cart (after checkout)
    }
    await student.save();
    return res.status(200).json({ success: true, cart: student.cart });
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
