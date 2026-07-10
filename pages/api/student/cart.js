import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import Course from "@/models/CourseModel";
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

  // GET — return cart with full course data (not just IDs)
  if (req.method === "GET") {
    const student = await StudentUser.findById(studentId).select("cart").lean();
    const cartIds = (student?.cart || []).filter(Boolean);

    if (cartIds.length === 0) {
      return res.status(200).json({ success: true, cart: [] });
    }

    const courses = await Course.find({ _id: { $in: cartIds } })
      .select("title subject price originalPrice featureImage batch")
      .lean();

    const courseMap = Object.fromEntries(courses.map(c => [c._id.toString(), c]));

    // Preserve original cart order, skip any deleted courses
    const cart = cartIds
      .map(id => courseMap[id?.toString()])
      .filter(Boolean)
      .map(c => ({
        _id:           c._id.toString(),
        title:         c.title         || "",
        subject:       c.subject       || "",
        price:         c.price         || 0,
        originalPrice: c.originalPrice || c.price || 0,
        featureImage:  c.featureImage  || "",
        batch:         c.batch         || "",
      }));

    return res.status(200).json({ success: true, cart });
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
    return res.status(200).json({ success: true });
  }

  // DELETE — remove course from cart (or clear all)
  if (req.method === "DELETE") {
    const { courseId } = req.body;
    const student = await StudentUser.findById(studentId).select("cart");
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    if (courseId) {
      student.cart = (student.cart || []).filter(id => id !== courseId);
    } else {
      student.cart = [];
    }
    await student.save();
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
