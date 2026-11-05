import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { toast } from "sonner";
import { MdChevronLeft, MdChevronRight, MdFileDownload } from "react-icons/md";
import { withAdminAuth } from "@/lib/withAdminAuth";
import { LEAD_STATUSES } from "@/lib/leadPipeline";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import SalesStyles from "@/components/dashboard/sales/SalesStyles";
import { monthLabel, currentMonthKey, initial, TrendBars, StatusBreakdown } from "@/components/dashboard/sales/shared";

const shiftMonth = (key, by) => {
  const [y, m] = key.split("-").map(Number);
  const d = new Date(y, m - 1 + by, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

export default function SalesReportsPage() {
  const [month, setMonth] = useState(currentMonthKey());
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const thisMonth = currentMonthKey();

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetch(`/api/admin/sales/reports?month=${month}`)
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        if (!data.success) throw new Error(data.message);
        setReport(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!alive) return;
        toast.error(err.message || "Failed to load report");
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [month]);

  const exportCsv = () => {
    if (!report) return;
    const head = [
      "Name", "Username", "Account", "Assigned", ...LEAD_STATUSES, "Sales Closed", "Conversion %",
      "Follow-ups Written", "Due Follow-ups", "All-time Leads", "All-time Sales", "All-time Conversion %",
    ];
    const line = (r) => [
      r.name, r.username, r.status, r.assigned, ...LEAD_STATUSES.map((s) => r.byStatus[s] || 0), r.sales,
      r.conversion, r.followUps, r.due, r.allTimeAssigned, r.allTimeSales, r.allTimeConversion,
    ];
    const t = report.team;
    const total = [
      "Team total", "", "", t.assigned, ...LEAD_STATUSES.map((s) => t.byStatus[s] || 0), t.sales, t.conversion,
      t.followUps, t.due,
      report.rows.reduce((n, r) => n + r.allTimeAssigned, 0),
      report.rows.reduce((n, r) => n + r.allTimeSales, 0), "",
    ];
    const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [head, ...report.rows.map(line), total].map((row) => row.map(esc).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `sales-report-${report.month}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const team = report?.team;
  const rows = report?.rows || [];

  return (
    <div>
      <Head>
        <title>Sales Reports — SS Coaching</title>
      </Head>
      <SalesStyles />
      <Topbar />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <AdminOffcanvas />

        <div className="flex-grow-1 sl-bg">
          <div className="container-fluid p-4">
            <div className="sl-head">
              <div>
                <Link href="/dashboard/admin/sales" className="sl-back">
                  ← Sales Team
                </Link>
                <h4 className="sl-title">Sales Reports</h4>
                <p className="sl-sub">Month by month: who received how many leads, where each one stands, and who closed sales.</p>
              </div>
              <div className="d-flex gap-2 align-items-center flex-wrap">
                <button className="sl-icon-btn" title="Previous month" onClick={() => setMonth(shiftMonth(month, -1))}>
                  <MdChevronLeft size={20} />
                </button>
                <input
                  type="month"
                  className="sl-input"
                  style={{ width: 170 }}
                  value={month}
                  max={thisMonth}
                  onChange={(e) => e.target.value && setMonth(e.target.value)}
                />
                <button
                  className="sl-icon-btn"
                  title="Next month"
                  disabled={month >= thisMonth}
                  onClick={() => setMonth(shiftMonth(month, 1))}
                >
                  <MdChevronRight size={20} />
                </button>
                <button className="sl-btn-ghost" onClick={exportCsv} disabled={!report}>
                  <MdFileDownload size={18} /> Export CSV
                </button>
              </div>
            </div>

            {loading && !report && <p className="sl-empty">Loading…</p>}

            {team && (
              <>
                <div className="sl-stats">
                  {[
                    { label: "Leads Received", value: team.leadsReceived, note: `${monthLabel(report.month)} enquiries` },
                    { label: "Assigned to Sales", value: team.assigned, note: `${team.unassigned} left unassigned` },
                    { label: "Sales Closed", value: team.sales, note: "Marked Converted this month", brand: true },
                    { label: "Conversion", value: `${team.conversion}%`, note: "Of this month's assigned leads", brand: true },
                    { label: "Follow-ups Written", value: team.followUps, note: "By the whole team" },
                    { label: "Due Follow-ups", value: team.due, note: "Today or overdue, right now" },
                  ].map((s) => (
                    <div key={s.label} className="sl-stat">
                      <div className="sl-stat-label">{s.label}</div>
                      <div className={`sl-stat-value ${s.brand ? "brand" : ""}`}>{s.value}</div>
                      <div className="sl-stat-note">{s.note}</div>
                    </div>
                  ))}
                </div>

                <div className="sl-grid-2">
                  <div className="sl-card">
                    <h6 className="sl-card-title">
                      Six months to {monthLabel(report.month)} <small>whole team</small>
                    </h6>
                    <TrendBars trend={report.trend} />
                  </div>
                  <div className="sl-card">
                    <h6 className="sl-card-title">
                      Status of {monthLabel(report.month)} leads <small>{team.assigned} assigned, as they stand today</small>
                    </h6>
                    <StatusBreakdown byStatus={team.byStatus} total={team.assigned} />
                  </div>
                </div>

                <div className="sl-card">
                  <h6 className="sl-card-title">
                    Per sales person — {monthLabel(report.month)} <small>{rows.length} people</small>
                  </h6>
                  {rows.length === 0 ? (
                    <p className="sl-empty">No sales people yet.</p>
                  ) : (
                    <div className="sl-table-wrap" style={{ opacity: loading ? 0.6 : 1 }}>
                      <table className="sl-table">
                        <thead>
                          <tr>
                            <th>Sales Person</th>
                            <th className="num">Assigned</th>
                            {LEAD_STATUSES.map((s) => (
                              <th key={s} className="num">
                                {s}
                              </th>
                            ))}
                            <th className="num">Sales</th>
                            <th className="num">Conv.</th>
                            <th className="num">Follow-ups</th>
                            <th className="num">Due</th>
                            <th className="num">All-time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((r) => (
                            <tr key={r._id}>
                              <td>
                                <Link href={`/dashboard/admin/sales/${r._id}`} className="sl-person" style={{ textDecoration: "none" }}>
                                  <span className="sl-avatar">{initial(r.name)}</span>
                                  <span>
                                    <div className="sl-strong">{r.name}</div>
                                    <div className="sl-faint">
                                      @{r.username}
                                      {r.status !== "active" ? " · inactive" : ""}
                                    </div>
                                  </span>
                                </Link>
                              </td>
                              <td className="num sl-strong">{r.assigned}</td>
                              {LEAD_STATUSES.map((s) => (
                                <td key={s} className="num">
                                  {r.byStatus[s] || <span className="sl-faint">0</span>}
                                </td>
                              ))}
                              <td className="num sl-strong" style={{ color: "#5641ce" }}>
                                {r.sales}
                              </td>
                              <td className="num">{r.conversion}%</td>
                              <td className="num">{r.followUps}</td>
                              <td className="num" style={r.due ? { color: "#b91c1c", fontWeight: 700 } : undefined}>
                                {r.due}
                              </td>
                              <td className="num">
                                <div className="sl-strong">
                                  {r.allTimeSales}/{r.allTimeAssigned}
                                </div>
                                <div className="sl-faint">{r.allTimeConversion}%</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td>Team total</td>
                            <td className="num">{team.assigned}</td>
                            {LEAD_STATUSES.map((s) => (
                              <td key={s} className="num">
                                {team.byStatus[s] || 0}
                              </td>
                            ))}
                            <td className="num">{team.sales}</td>
                            <td className="num">{team.conversion}%</td>
                            <td className="num">{team.followUps}</td>
                            <td className="num">{team.due}</td>
                            <td className="num">
                              {rows.reduce((n, r) => n + r.allTimeSales, 0)}/{rows.reduce((n, r) => n + r.allTimeAssigned, 0)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}
                  <p className="sl-hint" style={{ marginTop: 10 }}>
                    Status columns count the leads assigned in {monthLabel(report.month)}, as they stand today. Sales counts
                    leads marked Converted during the month, whenever they came in.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }), { superAdminOnly: true });
