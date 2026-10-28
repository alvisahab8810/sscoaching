import Enrollment from "@/models/EnrollmentModel";
import Course from "@/models/CourseModel";
import jwt from "jsonwebtoken";

/**
 * Access rules for live / online classes.
 *
 * This mirrors the logic already used by /api/onlineClasses so both the
 * "Live" tab and the course detail screen in the app agree on who may see
 * a stream link. The rules live here so the onlineClasses endpoint itself
 * does not have to change.
 *
 * A class is unlocked when:
 *   - it is linked to a course and the student is enrolled in that course
 *     (bundle children count as enrolled), or
 *   - it is not linked to any course, and the student is enrolled in some
 *     course with the same subject + batch.
 */

export function getStudentIdFromReq(req) {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "").trim();
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id || decoded._id || null;
  } catch {
    return null;
  }
}

export function isAuthenticatedAdmin(req) {
  try {
    const adminToken = req.cookies?.admin_token || req.cookies?.subadmin_token;
    if (!adminToken) return false;
    jwt.verify(adminToken, process.env.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function getStudentAccess(studentId) {
  const empty = { enrolledCourseIds: new Set(), unlockedKeys: new Set() };
  if (!studentId) return empty;

  const enrollments = await Enrollment.find({ student: studentId, status: "active" })
    .select("course")
    .lean();
  if (!enrollments.length) return empty;

  const courseIds = enrollments.map((e) => e.course).filter(Boolean);
  const courses = await Course.find({ _id: { $in: courseIds } })
    .select("subject batch courseType bundledSubjects includedCourses")
    .lean();

  const enrolledCourseIds = new Set(courseIds.map(String));
  const unlockedKeys = new Set();

  for (const c of courses) {
    const batch = (c.batch || "").toLowerCase();

    if (c.courseType === "bundle") {
      for (const sub of c.bundledSubjects || []) {
        if (sub) unlockedKeys.add(`${String(sub).toLowerCase()}::${batch}`);
      }
      for (const incId of c.includedCourses || []) {
        enrolledCourseIds.add(String(incId));
      }
    } else if (c.subject) {
      unlockedKeys.add(`${String(c.subject).toLowerCase()}::${batch}`);
    }
  }

  return { enrolledCourseIds, unlockedKeys };
}

export function isClassUnlocked(cls, { enrolledCourseIds, unlockedKeys }) {
  if (cls.course) {
    const courseId = String(cls.course._id || cls.course);
    return enrolledCourseIds.has(courseId);
  }

  const key = `${(cls.subject || "").toLowerCase()}::${(cls.batch || "").toLowerCase()}`;
  return unlockedKeys.has(key);
}

/**
 * Returns the class as it may be sent to this student. A locked class keeps
 * its title, subject, batch and timing so it still shows in the list, but
 * loses the stream link, so the app's Join button has nothing to open.
 */
export function sanitizeClassForStudent(cls, access) {
  const obj = cls?.toObject ? cls.toObject() : cls;

  if (isClassUnlocked(obj, access)) {
    return { ...obj, isUnlocked: true };
  }

  const { streamLink, ...rest } = obj;
  return { ...rest, isUnlocked: false };
}
