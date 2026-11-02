// Consultant queue tabs, shared by the desk overview and the applications list.
export const QUEUE_TABS = [
  { key: "verify", label: "To verify", status: ["submitted"] },
  { key: "changes", label: "Changes asked", status: ["changes_requested"] },
  { key: "payment", label: "Awaiting payment", status: ["verified"] },
  { key: "nios", label: "Fill NIOS form", status: ["paid", "form_in_progress"] },
  { key: "enrol", label: "Waiting for enrollment", status: ["submitted_to_nios"] },
  { key: "examfee", label: "Exam fee due", status: ["enrolled"] },
  { key: "done", label: "Completed", status: ["exam_fee_paid"] },
  { key: "drafts", label: "Drafts", status: ["draft"] },
  { key: "all", label: "All", status: [] },
];

/** Files in the given statuses; an empty list means every status. */
export const countOf = (byStatus, statuses) =>
  statuses.length
    ? statuses.reduce((n, s) => n + (byStatus?.[s] || 0), 0)
    : Object.values(byStatus || {}).reduce((n, x) => n + x, 0);
