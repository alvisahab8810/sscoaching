import dbConnect from "@/lib/dbConnect";
import Course from "@/models/CourseModel";
import { requireTeacherApi } from "@/lib/teacherAuth";

/**
 * A slim course list for the "link this class to a course" dropdown.
 *
 * The teacher portal has its own route for this rather than reusing
 * /api/courses?admin=1, which only answers admin and sub-admin sessions.
 */
export default async function handler(req, res) {
  const session = requireTeacherApi(req, res);
  if (!session) return;

  if (req.method !== "GET") return res.status(405).end();

  await dbConnect();

  const courses = await Course.find({}, "title subject batch status")
    .sort({ title: 1 })
    .lean();

  return res.status(200).json({ success: true, data: courses });
}
