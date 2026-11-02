import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import { requireActiveStudent } from "@/lib/studentAuth";


export default async function handler(req, res) {
  await dbConnect();
  // Checks the account is still active, so deactivating a student ends
  // their session here too and not only at the next app launch.
  const session = await requireActiveStudent(req);
  if (!session.ok)
    return res.status(session.status).json({ success: false, message: session.message });
  const studentId = session.id;

  // GET — fetch wishlist
  if (req.method === "GET") {
    const student = await StudentUser.findById(studentId).select("wishlist").lean();
    return res.status(200).json({ success: true, wishlist: student?.wishlist || [] });
  }

  // POST — toggle course in wishlist
  if (req.method === "POST") {
    const { courseId } = req.body;
    if (!courseId) return res.status(400).json({ success: false, message: "courseId required" });

    const student = await StudentUser.findById(studentId).select("wishlist");
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    const idx = (student.wishlist || []).indexOf(courseId);
    let added;
    if (idx === -1) {
      student.wishlist = [...(student.wishlist || []), courseId];
      added = true;
    } else {
      student.wishlist.splice(idx, 1);
      added = false;
    }
    await student.save();
    return res.status(200).json({ success: true, added, wishlist: student.wishlist });
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
