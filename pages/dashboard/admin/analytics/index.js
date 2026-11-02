import { useState, useEffect } from "react";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Head from "next/head";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import {
  MdTrendingUp, MdPeople, MdSchool, MdPlayLesson,
  MdCurrencyRupee, MdRefresh,
  MdSchedule, MdTimelapse,
} from "react-icons/md";

function fmt(n) {
  if (n >= 100000) return "₹" + (n / 100000).toFixed(1) + "L";
  if (n >= 1000) return "₹" + (n / 1000).toFixed(1) + "K";
  return "₹" + (n || 0).toLocaleString("en-IN");
}
function fmtFull(n) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0);
}
// Study time, written the way the number deserves: minutes while it is
// still under an hour, one decimal up to a thousand hours, then "1.2K h".
function fmtHours(hours) {
  const h = Number(hours) || 0;
  if (h <= 0) return "0 h";
  if (h < 1) return Math.round(h * 60) + " min";
  if (h >= 1000) return (h / 1000).toFixed(1) + "K h";
  return (Math.round(h * 10) / 10).toLocaleString("en-IN") + " h";
}

function fmtDate(d) {
  return d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";
}

// Every card used to carry its own colour, which made the grid read as a
// palette instead of a set of numbers. The icon is slate by default; `accent`
// marks the cards that matter most.
function KpiCard({ icon, label, value, sub, accent }) {
  return (
    <div className="an-kpi">
      <div className={`an-kpi-icon ${accent ? "accent" : ""}`}>
        {icon}
      </div>
      <div className="an-kpi-body">
        <div className="an-kpi-val">{value}</div>
        <div className="an-kpi-label">{label}</div>
        {sub && <div className="an-kpi-sub">{sub}</div>}
      </div>
    </div>
  );
}

function BarChart({ data, formatValue }) {
  if (!data || !data.length) return null;
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="an-bar-chart">
      {data.map((d, i) => (
        <div key={i} className="an-bar-col">
          <div className="an-bar-val">{formatValue ? formatValue(d.value) : d.value}</div>
          <div className="an-bar-wrap">
            <div
              className="an-bar"
              style={{ height: `${Math.max((d.value / max) * 100, d.value > 0 ? 4 : 0)}%` }}
            />
          </div>
          <div className="an-bar-label">{d.label}</div>
        </div>
      ))}
    </div>
  );
}

function TypeBreakdown({ data, total }) {
  const items = [
    { key: "paid",  label: "Online Payment", tone: "accent" },
    { key: "free",  label: "Free / Coupon", tone: "slate" },
  ];
  return (
    <div className="an-type-list">
      {items.map(item => {
        const count = data[item.key] || 0;
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        return (
          <div key={item.key} className="an-type-row">
            <div className={`an-type-dot ${item.tone}`} />
            <div className="an-type-info">
              <span className="an-type-label">{item.label}</span>
              <span className="an-type-count">{count} enrollments</span>
            </div>
            <div className="an-type-right">
              <div className="an-type-pct">{pct}%</div>
              <div className="an-type-bar-bg">
                <div className={`an-type-bar-fill ${item.tone}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    fetch("/api/admin/analytics")
      .then(r => r.json())
      .then(d => {
        if (d.success) setData(d);
        else setError("Failed to load analytics");
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const kpi = data?.kpi || {};
  const paidEnroll = data?.enrollmentsByType?.paid || 0;
  const totalEnroll = paidEnroll + (data?.enrollmentsByType?.free || 0);

  // The three bar charts cover the last six months, so their headers are
  // summed from the plotted values. They used to print the all-time figure,
  // which did not match the bars underneath it.
  const sumSeries = (series) =>
    (series || []).reduce((acc, point) => acc + (point.value || 0), 0);
  const revenue6m = sumSeries(data?.revenueMonthly);
  const enrollments6m = sumSeries(data?.enrollmentsMonthly);
  const students6m = sumSeries(data?.studentsMonthly);

  return (
    <>
      <Head><title>Analytics — Admin Dashboard</title></Head>
      <div className="oc-wrapper">
        <Topbar />
        <AdminOffcanvas />
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar />
          <div className="flex-grow-1 an-bg" style={{ minWidth: 0 }}>
            <div className="container-fluid p-4">
          <div className="an-page">

            {/* Page header */}
            <div className="an-page-header">
              <div>
                <h4 className="an-page-title">Analytics</h4>
                <p className="an-page-sub">Platform overview — revenue, enrollments, and student growth.</p>
              </div>
              <button className="an-refresh-btn" onClick={load} disabled={loading}>
                <span className="an-ico"><MdRefresh size={16} /></span>
                {loading ? "Loading…" : "Refresh"}
              </button>
            </div>

            {error && <div className="an-error">{error}</div>}

            {loading && !data ? (
              <div className="an-skeleton-grid">
                {[...Array(6)].map((_, i) => <div key={i} className="an-skeleton-kpi" />)}
              </div>
            ) : data && (
              <>
                {/* ── KPI Cards ── */}
                <div className="an-kpi-grid">
                  <KpiCard
                    icon={<MdCurrencyRupee size={20} />}
                    label="Total Revenue"
                    value={fmt(kpi.totalRevenue)}
                    sub={`${fmtFull(kpi.monthRevenue)} this month`}
                    accent
                  />
                  <KpiCard
                    icon={<MdTrendingUp size={20} />}
                    label="This Month Revenue"
                    value={fmt(kpi.monthRevenue)}
                    sub="from paid enrollments"
                    accent
                  />
                  <KpiCard
                    icon={<MdPlayLesson size={20} />}
                    label="Total Enrollments"
                    value={kpi.totalEnrollments?.toLocaleString()}
                    sub={`+${kpi.monthEnrollments} this month`}
                    accent
                  />
                  <KpiCard
                    icon={<MdPeople size={20} />}
                    label="Total Students"
                    value={kpi.totalStudents?.toLocaleString()}
                    sub={`+${kpi.monthStudents} joined this month`}
                  />
                  <KpiCard
                    icon={<MdSchedule size={20} />}
                    label="Student Study Hours"
                    value={fmtHours(kpi.studyHours)}
                    sub={`${(kpi.lessonsCompleted || 0).toLocaleString()} lessons completed by ${kpi.studyingStudents || 0} students`}
                  />
                  <KpiCard
                    icon={<MdTimelapse size={20} />}
                    label="Avg. Study / Active Student"
                    value={fmtHours(kpi.avgHoursPerStudent)}
                    sub={
                      kpi.studyingStudents
                        ? `across ${kpi.studyingStudents} students who have started`
                        : "no lessons completed yet"
                    }
                  />
                  <KpiCard
                    icon={<MdSchool size={20} />}
                    label="Published Courses"
                    value={kpi.publishedCourses?.toLocaleString()}
                  />
                  <KpiCard
                    icon={<MdTrendingUp size={20} />}
                    label="Avg. Revenue / Paid Enrollment"
                    value={paidEnroll > 0 ? fmt(Math.round(kpi.totalRevenue / paidEnroll)) : "₹0"}
                    sub={`across ${paidEnroll} paid enrollments`}
                  />
                </div>

                {/* ── Charts Row ── */}
                <div className="an-charts-row">
                  <div className="an-chart-card">
                    <div className="an-chart-header">
                      <span className="an-chart-title">Revenue (Last 6 Months)</span>
                      <span className="an-chart-total">{fmtFull(revenue6m)} in this period</span>
                    </div>
                    <BarChart
                      data={data.revenueMonthly}
                      formatValue={v => v === 0 ? "₹0" : fmt(v)}
                    />
                  </div>

                  <div className="an-chart-card">
                    <div className="an-chart-header">
                      <span className="an-chart-title">Enrollments (Last 6 Months)</span>
                      <span className="an-chart-total">{enrollments6m} in this period</span>
                    </div>
                    <BarChart
                      data={data.enrollmentsMonthly}
                      formatValue={v => v}
                    />
                  </div>
                </div>

                {/* ── Second Row: Type Breakdown + Student Growth ── */}
                <div className="an-charts-row">
                  <div className="an-chart-card">
                    <div className="an-chart-header">
                      <span className="an-chart-title">Enrollment Type Breakdown</span>
                      <span className="an-chart-total">{totalEnroll} total</span>
                    </div>
                    <TypeBreakdown data={data.enrollmentsByType} total={totalEnroll} />
                  </div>

                  <div className="an-chart-card">
                    <div className="an-chart-header">
                      <span className="an-chart-title">New Students (Last 6 Months)</span>
                      <span className="an-chart-total">{students6m} in this period</span>
                    </div>
                    <BarChart
                      data={data.studentsMonthly}
                      formatValue={v => v}
                    />
                  </div>
                </div>

                {/* ── Top Courses + Recent Enrollments ── */}
                <div className="an-bottom-row">
                  <div className="an-chart-card an-top-courses">
                    <div className="an-chart-header">
                      <span className="an-chart-title">Top Courses by Enrollment</span>
                    </div>
                    <div className="an-course-list">
                      {(data.topCourses || []).length === 0 && (
                        <p className="an-empty">No courses yet</p>
                      )}
                      {(data.topCourses || []).map((c, i) => (
                        <div key={c._id} className="an-course-row">
                          <div className="an-course-rank">#{i + 1}</div>
                          <div className="an-course-info">
                            <div className="an-course-name">{c.title}</div>
                            <div className="an-course-meta">
                              {c.subject && <span className="an-chip">{c.subject}</span>}
                              {c.isFree ? <span className="an-chip">Free</span> : <span className="an-chip accent">{fmtFull(c.price)}</span>}
                            </div>
                          </div>
                          <div className="an-course-enroll">
                            <span className="an-enroll-num">{c.enrolledCount || 0}</span>
                            <span className="an-enroll-lbl">students</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="an-chart-card an-recent-table">
                    <div className="an-chart-header">
                      <span className="an-chart-title">Recent Enrollments</span>
                    </div>
                    <div className="an-table-wrap">
                      <table className="an-table">
                        <thead>
                          <tr>
                            <th>Student</th>
                            <th>Course</th>
                            <th>Type</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(data.recentEnrollments || []).length === 0 && (
                            <tr><td colSpan={4} className="an-empty">No enrollments yet</td></tr>
                          )}
                          {(data.recentEnrollments || []).map(e => (
                            <tr key={e._id}>
                              <td>
                                <div className="an-stu-name">{e.student?.name || "—"}</div>
                                <div className="an-stu-email">{e.student?.email || ""}</div>
                              </td>
                              <td className="an-course-cell">{e.course?.title || "—"}</td>
                              <td>
                                <span className={`an-chip ${e.type === "paid" ? "accent" : ""}`}>
                                  {e.type === "paid" ? "Online" : e.type === "cod" ? "COD" : "Free"}
                                </span>
                              </td>
                              <td className="an-date-cell">{fmtDate(e.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .an-bg { background: #f1f5f9; }
        .an-page { max-width: 1200px; }

        /* react-icons renders its own svg, which styled-jsx will not scope,
           so every icon that needs sizing sits inside a span. */
        .an-ico { display: inline-flex; align-items: center; }

        /* Header */
        .an-page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .an-page-title {
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        .an-page-sub {
          font-size: 0.86rem;
          color: #64748b;
          margin: 4px 0 0;
        }
        .an-refresh-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 9px 18px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #334155;
          white-space: nowrap;
        }
        .an-refresh-btn:hover:not(:disabled) { background: #f8fafc; border-color: #cbd5e1; }
        .an-refresh-btn:disabled { opacity: 0.6; }

        .an-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 0.85rem;
          margin-bottom: 14px;
        }

        /* Skeleton */
        .an-skeleton-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .an-skeleton-kpi {
          height: 96px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
        }

        /* KPI Grid */
        .an-kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 14px;
        }
        .an-kpi {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .an-kpi-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          background: #f1f5f9;
          color: #475569;
        }
        .an-kpi-icon.accent { background: #f1eefc; color: #5641ce; }
        .an-kpi-body { min-width: 0; }
        .an-kpi-val {
          font-size: 1.4rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .an-kpi-label {
          font-size: 0.7rem;
          color: #94a3b8;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .an-kpi-sub {
          font-size: 0.74rem;
          color: #94a3b8;
          margin-top: 6px;
          line-height: 1.4;
        }

        /* Charts */
        .an-charts-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }
        .an-chart-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px;
        }
        .an-chart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
          flex-wrap: wrap;
          gap: 6px;
        }
        .an-chart-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: #0f172a;
        }
        .an-chart-total {
          font-size: 0.78rem;
          color: #94a3b8;
          font-weight: 600;
        }

        /* Bar chart */
        .an-bar-chart {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 6px;
          height: 160px;
        }
        .an-bar-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
        }
        .an-bar-val {
          font-size: 0.68rem;
          font-weight: 700;
          color: #475569;
          margin-bottom: 4px;
          text-align: center;
        }
        .an-bar-wrap {
          flex: 1;
          width: 100%;
          display: flex;
          align-items: flex-end;
          background: #f8fafc;
          border-radius: 6px 6px 0 0;
          overflow: hidden;
        }
        .an-bar {
          width: 100%;
          background: #5641ce;
          border-radius: 5px 5px 0 0;
          transition: height 0.4s ease;
          min-height: 0;
        }
        .an-bar-label {
          font-size: 0.68rem;
          color: #94a3b8;
          font-weight: 600;
          margin-top: 6px;
          text-align: center;
        }

        /* Type breakdown */
        .an-type-list { display: flex; flex-direction: column; gap: 16px; padding: 4px 0; }
        .an-type-row { display: flex; align-items: center; gap: 12px; }
        .an-type-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
        .an-type-dot.accent { background: #5641ce; }
        .an-type-dot.slate { background: #cbd5e1; }
        .an-type-info { display: flex; flex-direction: column; gap: 2px; min-width: 120px; }
        .an-type-label { font-size: 0.85rem; font-weight: 600; color: #0f172a; }
        .an-type-count { font-size: 0.74rem; color: #94a3b8; }
        .an-type-right { flex: 1; }
        .an-type-pct { font-size: 0.78rem; font-weight: 700; color: #475569; margin-bottom: 4px; text-align: right; }
        .an-type-bar-bg { background: #f1f5f9; border-radius: 6px; height: 8px; overflow: hidden; }
        .an-type-bar-fill { height: 100%; border-radius: 6px; transition: width 0.4s ease; }
        .an-type-bar-fill.accent { background: #5641ce; }
        .an-type-bar-fill.slate { background: #cbd5e1; }

        /* Bottom row */
        .an-bottom-row {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 14px;
          margin-bottom: 24px;
        }

        /* Top courses */
        .an-course-list { display: flex; flex-direction: column; gap: 10px; }
        .an-course-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 10px;
        }
        .an-course-rank {
          font-size: 0.8rem;
          font-weight: 700;
          color: #5641ce;
          width: 28px;
          text-align: center;
          flex-shrink: 0;
        }
        .an-course-info { flex: 1; min-width: 0; }
        .an-course-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .an-course-meta { display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap; }
        .an-chip {
          display: inline-block;
          background: #f1f5f9;
          color: #475569;
          font-size: 0.7rem;
          padding: 3px 9px;
          border-radius: 6px;
          font-weight: 700;
          white-space: nowrap;
        }
        .an-chip.accent {
          background: #f1eefc;
          color: #4634ad;
          border: 1px solid #ded7f6;
        }
        .an-course-enroll { text-align: right; flex-shrink: 0; }
        .an-enroll-num { display: block; font-size: 1.05rem; font-weight: 700; color: #0f172a; line-height: 1; }
        .an-enroll-lbl { font-size: 0.68rem; color: #94a3b8; font-weight: 600; }

        /* Recent enrollments table */
        .an-table-wrap { overflow-x: auto; }
        .an-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }
        .an-table th {
          text-align: left;
          font-size: 0.7rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 10px 12px;
          border-bottom: 1px solid #e2e8f0;
          white-space: nowrap;
        }
        .an-table td {
          padding: 12px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
          color: #334155;
        }
        .an-table tbody tr:hover { background: #f8fafc; }
        .an-stu-name { font-weight: 600; color: #0f172a; }
        .an-stu-email { font-size: 0.74rem; color: #94a3b8; margin-top: 2px; }
        .an-course-cell {
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #475569;
        }
        .an-date-cell { color: #94a3b8; font-size: 0.78rem; white-space: nowrap; }

        .an-empty { color: #94a3b8; font-size: 0.85rem; text-align: center; padding: 28px; }

        /* Responsive */
        @media (max-width: 1400px) {
          .an-kpi-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 1100px) {
          .an-kpi-grid { grid-template-columns: repeat(2, 1fr); }
          .an-skeleton-grid { grid-template-columns: repeat(2, 1fr); }
          .an-bottom-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 800px) {
          .an-charts-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 520px) {
          .an-kpi-grid { grid-template-columns: 1fr; }
          .an-skeleton-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}

export const getServerSideProps = withAdminAuth(async (context) => {
  return { props: {} };
});
