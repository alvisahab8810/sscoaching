import { useEffect, useState } from "react";
import Link from "next/link";
import SalesStyles from "./SalesStyles";
import { monthLabel, fmtDate, fmtDateTime, StatusBadge, TrendBars, StatusBreakdown } from "./shared";

/**
 * The home dashboard for a sales person: their own numbers only.
 */
export default function SalesDashboard() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/sales/my-report")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setReport(data);
        else setError(data.message || "Could not load your report");
      })
      .catch(() => setError("Could not load your report"));
  }, []);

  if (error) return <p className="sl-empty" style={{ textAlign: "left" }}>{error}</p>;
  if (!report) return <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Loading your report…</p>;

  const { totals, thisMonth, trend, dueLeads, recent } = report;
  const diff = thisMonth.sales - thisMonth.lastMonthSales;

  return (
    <div>
      <SalesStyles />

      <div className="sl-stats">
        {[
          { label: "Leads This Month", value: thisMonth.assigned, note: monthLabel(report.month) },
          {
            label: "Sales This Month",
            value: thisMonth.sales,
            note: diff === 0 ? "Same as last month" : `${diff > 0 ? "+" : ""}${diff} vs last month`,
            brand: true,
          },
          { label: "Follow-ups Written", value: thisMonth.followUps, note: "This month" },
          { label: "Due Follow-ups", value: dueLeads.length, note: "Today or overdue" },
          { label: "Total Leads", value: totals.assigned, note: `${totals.untouched} not contacted yet` },
          { label: "Total Sales", value: totals.sales, note: `${totals.conversion}% conversion`, brand: true },
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
            Last 6 months <small>leads received vs sales closed</small>
          </h6>
          <TrendBars trend={trend} />
        </div>
        <div className="sl-card">
          <h6 className="sl-card-title">
            My leads by status <small>{totals.assigned} in total</small>
          </h6>
          <StatusBreakdown byStatus={totals.byStatus} total={totals.assigned} />
        </div>
      </div>

      <div className="sl-grid-2">
        <div className="sl-card">
          <h6 className="sl-card-title">
            Follow-ups due <small>call these first</small>
          </h6>
          {dueLeads.length === 0 ? (
            <p className="sl-empty">Nothing due. You are up to date.</p>
          ) : (
            <div className="sl-table-wrap">
              <table className="sl-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Status</th>
                    <th>Due</th>
                  </tr>
                </thead>
                <tbody>
                  {dueLeads.map((l) => (
                    <tr key={l._id}>
                      <td>
                        <div className="sl-strong">{l.fullName}</div>
                        <div className="sl-faint">{l.leadId}</div>
                      </td>
                      <td>{l.phone}</td>
                      <td>
                        <StatusBadge status={l.status} />
                      </td>
                      <td style={{ color: "#b91c1c", fontWeight: 600 }}>{fmtDateTime(l.nextFollowUpAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div style={{ marginTop: 12 }}>
            <Link href="/dashboard/admin/follow-ups" className="sl-btn-ghost">
              Open Follow-ups
            </Link>
          </div>
        </div>

        <div className="sl-card">
          <h6 className="sl-card-title">
            Latest leads <small>most recently assigned to you</small>
          </h6>
          {recent.length === 0 ? (
            <p className="sl-empty">No leads assigned yet.</p>
          ) : (
            <div className="sl-table-wrap">
              <table className="sl-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Status</th>
                    <th>Assigned</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((l) => (
                    <tr key={l._id}>
                      <td>
                        <div className="sl-strong">{l.fullName}</div>
                        <div className="sl-faint">{l.city || l.leadId}</div>
                      </td>
                      <td>{l.phone}</td>
                      <td>
                        <StatusBadge status={l.status} />
                      </td>
                      <td>{fmtDate(l.assignedAt || l.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div style={{ marginTop: 12 }}>
            <Link href="/dashboard/admin/leads" className="sl-btn">
              Open All My Leads
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
