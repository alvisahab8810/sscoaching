/**
 * Turning a lesson's stored duration into minutes.
 *
 * A lesson keeps its duration as free text (models/CourseModel.js), and the
 * courses in the database are written as "MM:SS" -- "24:33" means 24 minutes
 * 33 seconds, not 24 hours. The other shapes below are accepted so a
 * hand-typed value does not silently count as zero.
 */

export function durationToMinutes(duration) {
  const raw = String(duration || "").trim();
  if (!raw) return 0;

  // "24:33" (mm:ss) and "1:24:33" (hh:mm:ss)
  if (raw.includes(":")) {
    const parts = raw.split(":").map((p) => Number(p.trim()));
    if (parts.some((n) => !Number.isFinite(n) || n < 0)) return 0;
    if (parts.length === 2) return parts[0] + parts[1] / 60;
    if (parts.length === 3) return parts[0] * 60 + parts[1] + parts[2] / 60;
    return 0;
  }

  // "45 min", "1.5 hours", "2h", or a bare number read as minutes.
  const match = raw.match(/([\d.]+)\s*([a-z]*)/i);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  if (!Number.isFinite(value) || value <= 0) return 0;

  const unit = (match[2] || "min").toLowerCase();
  if (unit.startsWith("h")) return value * 60;
  if (unit.startsWith("s")) return value / 60;
  return value;
}

/**
 * Every lesson of a course, as a Map of lesson id -> minutes.
 *
 * A subject course keeps its lessons under chapters, a bundle keeps them
 * under subjectContents[].chapters -- the same split the player screens and
 * /api/enrollments/my already work with.
 */
export function lessonMinutesByCourse(courses) {
  const byLesson = new Map();

  const walk = (chapters) => {
    for (const chapter of chapters || []) {
      for (const lesson of chapter.lessons || []) {
        if (!lesson?._id) continue;
        byLesson.set(String(lesson._id), durationToMinutes(lesson.duration));
      }
    }
  };

  for (const course of courses || []) {
    walk(course.chapters);
    for (const sc of course.subjectContents || []) walk(sc.chapters);
  }

  return byLesson;
}

/**
 * How much study time the completed lessons across all progress records add
 * up to.
 *
 * This is lesson time actually marked complete, not raw player watch time --
 * nothing records seconds watched today. A lesson counts once per student,
 * which is how CourseProgress stores it.
 */
export function studyTotals(progressDocs, lessonMinutes) {
  let minutes = 0;
  let lessonsCompleted = 0;
  let lessonsUntimed = 0;
  const students = new Set();

  for (const doc of progressDocs || []) {
    const completed = doc.completedLessons || [];
    if (!completed.length) continue;
    if (doc.student) students.add(String(doc.student));

    for (const lessonId of completed) {
      lessonsCompleted++;
      const mins = lessonMinutes.get(String(lessonId));
      if (mins > 0) minutes += mins;
      else lessonsUntimed++;
    }
  }

  const round1 = (n) => Math.round(n * 10) / 10;

  return {
    studyMinutes: Math.round(minutes),
    studyHours: round1(minutes / 60),
    studyingStudents: students.size,
    lessonsCompleted,
    lessonsUntimed,
    avgHoursPerStudent: students.size ? round1(minutes / 60 / students.size) : 0,
  };
}
