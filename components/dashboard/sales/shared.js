import { STATUS_STYLE, normalizeStatus } from "@/lib/leadPipeline";

// The dashboard sections an admin can open up for a sales person. Same keys
// as the sub-admin permissions, so the sidebar needs no changes to honour them.
export const SALES_FEATURES = [
  { key: "leads", label: "Leads & Follow-ups", desc: "Their own assigned leads only" },
  { key: "students", label: "Students", desc: "View and manage student records" },
  { key: "courses", label: "Courses", desc: "Manage course listings" },
  { key: "admissions", label: "Applications", desc: "View and manage admissions" },
  { key: "enrollments", label: "Enrollments", desc: "Track student enrollments" },
  { key: "invoices", label: "Invoices", desc: "View and manage billing" },
  { key: "announcements", label: "Announcements", desc: "Create and manage announcements" },
  { key: "online-classes", label: "Live Classes", desc: "Manage live video classes" },
  { key: "student-success", label: "Student Success", desc: "Manage student success stories" },
  { key: "blogs", label: "Blogs", desc: "Create, edit, delete blog posts" },
  { key: "faqs", label: "FAQs", desc: "Manage frequently asked questions" },
  { key: "pages", label: "Pages", desc: "Edit website page content" },
];

export const featureLabel = (key) => SALES_FEATURES.find((f) => f.key === key)?.label || key;

export function generatePassword(len = 12) {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-11" -> "Nov 2026" (or "Nov" when short)
export function monthLabel(key, short = false) {
  const [y, m] = String(key).split("-").map(Number);
  return short ? MONTHS[m - 1] : `${MONTHS[m - 1]} ${y}`;
}

export function currentMonthKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

export const fmtDateTime = (d) =>
  d
    ? new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })
    : "—";

export const initial = (name) => String(name || "?").trim().charAt(0).toUpperCase();

// The lead status colours already used on the Leads page.
export function StatusBadge({ status }) {
  const s = normalizeStatus(status);
  const st = STATUS_STYLE[s] || STATUS_STYLE.New;
  return (
    <span
      style={{
        background: st.bg,
        color: st.color,
        borderRadius: 999,
        padding: "3px 10px",
        fontSize: "0.74rem",
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {s}
    </span>
  );
}

/**
 * Leads assigned and sales closed, month by month, as paired bars.
 * Needs <SalesStyles /> on the page.
 */
export function TrendBars({ trend = [] }) {
  const max = Math.max(1, ...trend.map((t) => Math.max(t.assigned, t.sales)));
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 160, padding: "8px 4px 0" }}>
        {trend.map((t) => (
          <div key={t.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 4, width: "100%", justifyContent: "center" }}>
              {[
                { v: t.assigned, bg: "#d9d2f7", title: "Assigned" },
                { v: t.sales, bg: "#5641ce", title: "Sales" },
              ].map((b) => (
                <div key={b.title} title={`${b.title}: ${b.v}`} style={{ width: "34%", maxWidth: 22, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                  <span style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 600, marginBottom: 2 }}>{b.v || ""}</span>
                  <div style={{ width: "100%", height: `${(b.v / max) * 100}%`, minHeight: b.v ? 3 : 0, background: b.bg, borderRadius: "4px 4px 0 0" }} />
                </div>
              ))}
            </div>
            <div style={{ fontSize: "0.74rem", color: "#64748b", marginTop: 6, fontWeight: 600 }}>{monthLabel(t.month, true)}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: "0.76rem", color: "#64748b" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: "#d9d2f7" }} /> Leads assigned
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: "#5641ce" }} /> Sales closed
        </span>
      </div>
    </div>
  );
}

/**
 * Where a set of leads stands, one row per status with a bar.
 */
export function StatusBreakdown({ byStatus = {}, total = 0 }) {
  return (
    <div>
      {Object.entries(byStatus).map(([s, n]) => {
        const st = STATUS_STYLE[s] || STATUS_STYLE.New;
        const pct = total ? Math.round((n / total) * 100) : 0;
        return (
          <div key={s} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: 4 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#334155", fontWeight: 600 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: st.dot }} />
                {s}
              </span>
              <span style={{ color: "#0f172a", fontWeight: 700 }}>
                {n} <span style={{ color: "#94a3b8", fontWeight: 500 }}>· {pct}%</span>
              </span>
            </div>
            <div className="sl-bar-track">
              <div className="sl-bar-fill" style={{ width: `${pct}%`, background: st.dot }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
