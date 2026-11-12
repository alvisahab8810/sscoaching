import { matchSubject, NO_SCHEDULE_COURSE } from "@/lib/classSchedule";

/**
 * A live class can be linked to several courses (say the Commerce and the
 * Science Pro batch), so students of any of them may join.
 *
 * `courses` holds every linked course. `course` keeps the first of them, so
 * older readers (the app, reports) that only know one course still work.
 * Safe to import on the client.
 */

const idOf = (c) => String(c?._id || c || "");
const isId = (v) => /^[a-f0-9]{24}$/i.test(v);

// Every course id a class is linked to, old single-course rows included.
export function linkedCourseIds(cls) {
  const ids = [...(cls?.courses || []), cls?.course].map(idOf).filter(isId);
  return [...new Set(ids)];
}

// Course fields to save from a request body: { course, courses }.
// A body with `course` alone (an older client) still links that one course.
export function pickCourseIds(body = {}) {
  const list = Array.isArray(body.courses) ? body.courses : [body.course];
  const ids = [...new Set(list.map(idOf).filter(isId))];
  return { course: ids[0] || null, courses: ids };
}

const same = (a, b) => String(a || "").trim().toLowerCase() === String(b || "").trim().toLowerCase();

/**
 * Courses offered in the "link to course" list for the class and subject the
 * form is set to: Pro batches that teach the subject, and single courses of
 * that subject. TMA and question bank courses have no live classes. Courses
 * already linked always stay listed, so editing a class never drops a link.
 */
export function linkableCourses(all, { batch, subject, keep = [] }) {
  const kept = new Set(keep.map(String));
  return (all || []).filter((c) => {
    if (kept.has(String(c._id))) return true;
    if (batch && !same(c.batch, batch)) return false;
    if (c.courseType === "bundle") {
      if (!/\bpro\b/i.test(c.title || "")) return false;
      // A bundle with no subject list covers every subject.
      const bundled = c.bundledSubjects || [];
      return !subject || !bundled.length || !!matchSubject(subject, bundled);
    }
    if (!c.subject || NO_SCHEDULE_COURSE.test(c.title || "")) return false;
    return !subject || !!matchSubject(subject, [c.subject]);
  });
}
