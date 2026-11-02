// Content for the NIOS complete-package online admission feature.
// Kept in one place so the public pages and the admin desk show the same numbers.

export const PACKAGES = {
  "12": { label: "Class 12th", price: 12600, tagline: "The complete NIOS package", level: "Senior Secondary" },
  "10": { label: "Class 10th", price: 11600, tagline: "Complete package", level: "Secondary" },
};

export const INCLUSIONS = [
  { key: "admission", title: "Admission", text: "NIOS admission and form submission support" },
  { key: "classes", title: "Classes", text: "All recorded and live classes" },
  { key: "study", title: "Study", text: "Study materials and question banks" },
  { key: "tma", title: "TMA", text: "TMA support for every subject" },
  { key: "doubts", title: "Doubts", text: "Doubt clearing sessions" },
  { key: "exam", title: "Exam", text: "Support until your exam" },
];

export const JOURNEY = [
  ["Fill one form and upload documents", "Choose your stream and block, pick subjects, add Aadhaar and marksheets"],
  ["Consultant verifies everything", "Every detail and document is checked before anything goes to NIOS"],
  ["Pay once the payment link opens", "The link appears in your profile only after verification"],
  ["We fill and submit your NIOS form", "At the nearest NIOS study centre that can take your admission"],
  ["Enrollment number in your profile", "As soon as NIOS confirms your admission"],
  ["We submit your exam fee", "And stay with you until your exam"],
];

export const rupee = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");
