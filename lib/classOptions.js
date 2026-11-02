/**
 * The classes/batches a teacher can be assigned to, and the same values a
 * live class is scheduled under. Kept in one place so the teacher's assigned
 * class and the batch on their scheduled classes always use identical text.
 */
export const CLASS_OPTIONS = ["Class 10", "Class 12"];

/**
 * The subjects taught in each class. Subject names match the ones the live
 * class scheduler offers, so a teacher's subject and the subject on their
 * classes always read the same.
 */
export const SUBJECTS_BY_CLASS = {
  "Class 10": ["Mathematics", "English", "Social Science", "Science"],
  "Class 12": [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Accountancy",
    "Business Studies",
    "Economics",
  ],
};

// The subjects offered for a set of selected classes, de-duplicated so a
// subject taught in both classes (English, Mathematics) is listed once.
export function subjectsForClasses(classes = []) {
  const out = [];
  for (const cls of classes) {
    for (const subject of SUBJECTS_BY_CLASS[cls] || []) {
      if (!out.includes(subject)) out.push(subject);
    }
  }
  return out;
}
