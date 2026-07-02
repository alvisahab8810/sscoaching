import { useState, useEffect } from "react";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Head from "next/head";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import {
  MdTrendingUp, MdPeople, MdSchool, MdPlayLesson,
  MdCurrencyRupee, MdBarChart, MdRefresh,
} from "react-icons/md";

function fmt(n) {
  if (n >= 100000) return "₹" + (n / 100000).toFixed(1) + "L";
  if (n >= 1000) return "₹" + (n / 1000).toFixed(1) + "K";
  return "₹" + (n || 0).toLocaleString("en-IN");
}
function fmtFull(n) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0);
}
function fmtDate(d) {
  return d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";
}

function KpiCard({ icon, label, value, sub, color, bg }) {
  return (
    <div className="an-kpi">
      <div className="an-kpi-icon" style={{ background: bg, color }}>
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

function BarChart({ data, color, formatValue }) {
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
              style={{ height: `${Math.max((d.value / max) * 100, d.value > 0 ? 4 : 0)}%`, background: color }}
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
    { key: "paid",  label: "Online Payment", color: "#4441e5" },
    { key: "cod",   label: "Cash on Delivery", color: "#f59e0b" },
    { key: "free",  label: "Free / Coupon", color: "#10b981" },
  ];
  return (
    <div className="an-type-list">
      {items.map(item => {
        const count = data[item.key] || 0;
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        return (
          <div key={item.key} className="an-type-row">
            <div className="an-type-dot" style={{ background: item.color }} />
            <div className="an-type-info">
              <span className="an-type-label">{item.label}</span>
              <span className="an-type-count">{count} enrollments</span>
            </div>
            <div className="an-type-right">
              <div className="an-type-pct">{pct}%</div>
              <div className="an-type-bar-bg">
                <div className="an-type-bar-fill" style={{ width: `${pct}%`, background: item.color }} />
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
  const totalEnroll = (data?.enrollmentsByType?.paid || 0) + (data?.enrollmentsByType?.cod || 0) + (data?.enrollmentsByType?.free || 0);

  return (
    <>
      <Head><title>Analytics — Admin Dashboard</title></Head>
      <div className="oc-wrapper">
        <Topbar />
        <AdminOffcanvas />
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar />
          <div className="flex-grow-1 bg-light">
            <div className="container-fluid p-4">
          <div className="an-page">

            {/* Page header */}
            <div className="an-page-header">
              <div>
                <h1 className="an-page-title"><MdBarChart size={26} /> Analytics</h1>
                <p className="an-page-sub">Platform overview — revenue, enrollments, and student growth</p>
              </div>
              <button className="an-refresh-btn" onClick={load} disabled={loading}>
                <MdRefresh size={17} style={{ marginRight: 6 }} />
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
                    icon={<MdCurrencyRupee size={22} />}
                    label="Total Revenue"
                    value={fmt(kpi.totalRevenue)}
                    sub={`${fmtFull(kpi.monthRevenue)} this month`}
                    color="#4441e5" bg="#eef2ff"
                  />
                  <KpiCard
                    icon={<MdTrendingUp size={22} />}
                    label="This Month Revenue"
                    value={fmt(kpi.monthRevenue)}
                    sub="from paid enrollments"
                    color="#059669" bg="#d1fae5"
                  />
                  <KpiCard
                    icon={<MdPlayLesson size={22} />}
                    label="Total Enrollments"
                    value={kpi.totalEnrollments?.toLocaleString()}
                    sub={`+${kpi.monthEnrollments} this month`}
                    color="#d97706" bg="#fef3c7"
                  />
                  <KpiCard
                    icon={<MdPeople size={22} />}
                    label="Total Students"
                    value={kpi.totalStudents?.toLocaleString()}
                    sub={`+${kpi.monthStudents} joined this month`}
                    color="#7c3aed" bg="#f5f3ff"
                  />
                  <KpiCard
                    icon={<MdSchool size={22} />}
                    label="Published Courses"
                    value={kpi.publishedCourses?.toLocaleString()}
                    color="#0284c7" bg="#e0f2fe"
                  />
                  <KpiCard
                    icon={<MdTrendingUp size={22} />}
                    label="Avg. Revenue / Enrollment"
                    value={kpi.totalEnrollments > 0 ? fmt(Math.round(kpi.totalRevenue / kpi.totalEnrollments)) : "₹0"}
                    sub="across all paid enrollments"
                    color="#e11d48" bg="#fff1f2"
                  />
                </div>

                {/* ── Charts Row ── */}
                <div className="an-charts-row">
                  <div className="an-chart-card">
                    <div className="an-chart-header">
                      <span className="an-chart-title">Revenue (Last 6 Months)</span>
                      <span className="an-chart-total">{fmtFull(kpi.totalRevenue)} total</span>
                    </div>
                    <BarChart
                      data={data.revenueMonthly}
                      color="#4441e5"
                      formatValue={v => v === 0 ? "₹0" : fmt(v)}
                    />
                  </div>

                  <div className="an-chart-card">
                    <div className="an-chart-header">
                      <span className="an-chart-title">Enrollments (Last 6 Months)</span>
                      <span className="an-chart-total">{kpi.totalEnrollments} total</span>
                    </div>
                    <BarChart
                      data={data.enrollmentsMonthly}
                      color="#10b981"
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
                      <span className="an-chart-total">{kpi.totalStudents} total</span>
                    </div>
                    <BarChart
                      data={data.studentsMonthly}
                      color="#7c3aed"
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
                              {c.subject && <span className="an-subj-chip">{c.subject}</span>}
                              {c.isFree ? <span className="an-free-chip">Free</span> : <span className="an-price-chip">{fmtFull(c.price)}</span>}
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
                                <span className={`an-type-badge an-type-${e.type}`}>
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
        .an-page {
          max-width: 1200px;
        }

        /* Header */
        .an-page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .an-page-title {
          font-size: 22px;
          font-weight: 800;
          color: #0f1f3d;
          margin: 0 0 4px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Poppins', sans-serif;
        }
        .an-page-sub {
          font-size: 13px;
          color: #8491a8;
          margin: 0;
        }
        .an-refresh-btn {
          display: flex;
          align-items: center;
          background: #fff;
          border: 1.5px solid #e2e5f8;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #4441e5;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .an-refresh-btn:hover { background: #f0eeff; }
        .an-refresh-btn:disabled { opacity: 0.6; cursor: default; }

        .an-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 13px;
          margin-bottom: 20px;
        }

        /* Skeleton */
        .an-skeleton-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .an-skeleton-kpi {
          height: 100px;
          background: linear-gradient(90deg, #f0f0f5 25%, #e8e8f0 50%, #f0f0f5 75%);
          background-size: 200% 100%;
          animation: shimmer 1.3s infinite;
          border-radius: 12px;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* KPI Grid */
        .an-kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .an-kpi {
          background: #fff;
          border: 1.5px solid #e8eaf5;
          border-radius: 14px;
          padding: 20px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: box-shadow 0.18s;
        }
        .an-kpi:hover { box-shadow: 0 4px 20px rgba(68,65,229,0.09); }
        .an-kpi-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .an-kpi-body { min-width: 0; }
        .an-kpi-val {
          font-size: 24px;
          font-weight: 900;
          color: #0f1f3d;
          font-family: 'Poppins', sans-serif;
          line-height: 1.1;
          margin-bottom: 3px;
        }
        .an-kpi-label {
          font-size: 12px;
          color: #6b7a99;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .an-kpi-sub {
          font-size: 11px;
          color: #94a3b8;
          margin-top: 4px;
        }

        /* Charts */
        .an-charts-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .an-chart-card {
          background: #fff;
          border: 1.5px solid #e8eaf5;
          border-radius: 14px;
          padding: 22px 24px;
        }
        .an-chart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 6px;
        }
        .an-chart-title {
          font-size: 14px;
          font-weight: 700;
          color: #0f1f3d;
          font-family: 'Poppins', sans-serif;
        }
        .an-chart-total {
          font-size: 12px;
          color: #8491a8;
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
          font-size: 10px;
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
          background: #f8f9ff;
          border-radius: 6px 6px 0 0;
          overflow: hidden;
        }
        .an-bar {
          width: 100%;
          border-radius: 5px 5px 0 0;
          transition: height 0.5s ease;
          min-height: 0;
        }
        .an-bar-label {
          font-size: 10px;
          color: #94a3b8;
          font-weight: 600;
          margin-top: 6px;
          text-align: center;
        }

        /* Type breakdown */
        .an-type-list { display: flex; flex-direction: column; gap: 16px; padding: 4px 0; }
        .an-type-row { display: flex; align-items: center; gap: 12px; }
        .an-type-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .an-type-info { display: flex; flex-direction: column; gap: 1px; min-width: 120px; }
        .an-type-label { font-size: 13px; font-weight: 600; color: #0f1f3d; }
        .an-type-count { font-size: 11px; color: #94a3b8; }
        .an-type-right { flex: 1; }
        .an-type-pct { font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 4px; text-align: right; }
        .an-type-bar-bg { background: #f1f5f9; border-radius: 100px; height: 8px; overflow: hidden; }
        .an-type-bar-fill { height: 100%; border-radius: 100px; transition: width 0.5s ease; }

        /* Bottom row */
        .an-bottom-row {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 20px;
          margin-bottom: 24px;
        }

        /* Top courses */
        .an-course-list { display: flex; flex-direction: column; gap: 12px; }
        .an-course-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px;
          background: #f8f9ff;
          border-radius: 10px;
        }
        .an-course-rank {
          font-size: 13px;
          font-weight: 900;
          color: #4441e5;
          width: 28px;
          text-align: center;
          flex-shrink: 0;
        }
        .an-course-info { flex: 1; min-width: 0; }
        .an-course-name {
          font-size: 13px;
          font-weight: 700;
          color: #0f1f3d;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .an-course-meta { display: flex; gap: 6px; margin-top: 4px; flex-wrap: wrap; }
        .an-subj-chip, .an-free-chip, .an-price-chip {
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 100px;
          font-weight: 700;
        }
        .an-subj-chip { background: #eef2ff; color: #4441e5; }
        .an-free-chip { background: #d1fae5; color: #065f46; }
        .an-price-chip { background: #fef3c7; color: #92400e; }
        .an-course-enroll { text-align: right; flex-shrink: 0; }
        .an-enroll-num { display: block; font-size: 18px; font-weight: 900; color: #0f1f3d; line-height: 1; }
        .an-enroll-lbl { font-size: 10px; color: #94a3b8; font-weight: 600; }

        /* Recent enrollments table */
        .an-table-wrap { overflow-x: auto; }
        .an-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .an-table th {
          text-align: left;
          font-size: 10px;
          font-weight: 800;
          color: #8491a8;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 0 12px 12px;
          white-space: nowrap;
        }
        .an-table td {
          padding: 10px 12px;
          border-top: 1px solid #f1f5f9;
          vertical-align: middle;
        }
        .an-stu-name { font-weight: 600; color: #0f1f3d; }
        .an-stu-email { font-size: 11px; color: #94a3b8; margin-top: 1px; }
        .an-course-cell {
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #475569;
        }
        .an-date-cell { color: #94a3b8; font-size: 12px; white-space: nowrap; }
        .an-type-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 100px;
        }
        .an-type-paid { background: #eef2ff; color: #4441e5; }
        .an-type-cod  { background: #fef3c7; color: #92400e; }
        .an-type-free { background: #d1fae5; color: #065f46; }

        .an-empty { color: #94a3b8; font-size: 13px; text-align: center; padding: 24px; }

        /* Responsive */
        @media (max-width: 1100px) {
          .an-kpi-grid { grid-template-columns: repeat(2, 1fr); }
          .an-bottom-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 800px) {
          .an-charts-row { grid-template-columns: 1fr; }
          .an-kpi-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .an-kpi-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}

export const getServerSideProps = withAdminAuth(async (context) => {
  return { props: {} };
});
