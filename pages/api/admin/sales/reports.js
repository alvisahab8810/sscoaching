import dbConnect from "@/lib/dbConnect";
import SubAdmin from "@/models/SubAdmin";
import PopupForm from "@/models/PopupForm";
import { requireAdminApi } from "@/lib/requireAdminApi";
import {
  isMonthKey,
  monthKey,
  monthRange,
  monthsEnding,
  statusCountsBy,
  salesClosedBy,
  followUpsWrittenBy,
  followUpsDueBy,
  monthlyTrend,
  emptyStatusCounts,
  rate,
} from "@/lib/salesReport";

/**
 * The monthly sales report (super admin only). GET ?month=YYYY-MM
 *
 * For each sales person, for the chosen month:
 *   assigned   — leads handed to them that month
 *   byStatus   — where those leads stand today
 *   sales      — sales closed that month (any lead, whenever it came in)
 *   followUps  — follow-up notes they wrote that month
 * plus their all-time totals and the follow-ups due today.
 */
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ success: false, message: "Method not allowed" });

  const admin = requireAdminApi(req);
  if (admin?.role !== "super") return res.status(403).json({ success: false, message: "Forbidden" });

  const key = isMonthKey(req.query.month) ? req.query.month : monthKey();
  const range = monthRange(key);

  try {
    await dbConnect();

    const people = await SubAdmin.find({ isSales: true })
      .select("name username status createdAt")
      .sort({ createdAt: 1 })
      .lean();
    const ids = people.map((p) => p._id);

    const [cohort, sales, followUps, allTime, due, trend, monthLeads, unassigned] = await Promise.all([
      statusCountsBy(ids, range),
      salesClosedBy(ids, range),
      followUpsWrittenBy(ids, range),
      statusCountsBy(ids),
      followUpsDueBy(ids),
      monthlyTrend(ids, monthsEnding(key, 6)),
      PopupForm.countDocuments({ createdAt: { $gte: range.start, $lt: range.end } }),
      PopupForm.countDocuments({ createdAt: { $gte: range.start, $lt: range.end }, assignedTo: null }),
    ]);

    const rows = people.map((p) => {
      const id = String(p._id);
      const month = cohort[id] || { total: 0, byStatus: emptyStatusCounts() };
      const total = allTime[id] || { total: 0, byStatus: emptyStatusCounts() };
      return {
        _id: p._id,
        name: p.name,
        username: p.username,
        status: p.status,
        assigned: month.total,
        byStatus: month.byStatus,
        sales: sales[id] || 0,
        conversion: rate(month.byStatus.Converted, month.total),
        followUps: followUps[id] || 0,
        due: due[id] || 0,
        allTimeAssigned: total.total,
        allTimeSales: total.byStatus.Converted,
        allTimeConversion: rate(total.byStatus.Converted, total.total),
      };
    });

    const byStatus = emptyStatusCounts();
    for (const r of rows) for (const s of Object.keys(byStatus)) byStatus[s] += r.byStatus[s];

    const assigned = rows.reduce((n, r) => n + r.assigned, 0);
    const totalSales = rows.reduce((n, r) => n + r.sales, 0);

    return res.status(200).json({
      success: true,
      month: key,
      rows,
      team: {
        leadsReceived: monthLeads,
        unassigned,
        assigned,
        byStatus,
        sales: totalSales,
        conversion: rate(byStatus.Converted, assigned),
        followUps: rows.reduce((n, r) => n + r.followUps, 0),
        due: rows.reduce((n, r) => n + r.due, 0),
      },
      trend,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
