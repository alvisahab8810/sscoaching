import dbConnect from "@/lib/dbConnect";
import PopupForm from "@/models/PopupForm";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { leadAccess, clearSubAdminCookie } from "@/lib/salesAccess";
import {
  monthKey,
  monthRange,
  monthsEnding,
  statusCountsBy,
  salesClosedBy,
  followUpsWrittenBy,
  monthlyTrend,
  emptyStatusCounts,
  endOfTodayIST,
  rate,
  CLOSED,
} from "@/lib/salesReport";

/**
 * A sales person's own dashboard numbers. Everything here is limited to the
 * leads assigned to the signed-in sales person.
 */
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ success: false, message: "Method not allowed" });

  const admin = requireAdminApi(req);
  if (admin?.role !== "sub") return res.status(403).json({ success: false, message: "Sales accounts only" });

  try {
    await dbConnect();

    const access = await leadAccess(admin);
    if (!access.allowed) {
      clearSubAdminCookie(res);
      return res.status(401).json({ success: false, message: "Account inactive" });
    }
    if (!access.salesId) return res.status(403).json({ success: false, message: "Sales accounts only" });

    const me = access.salesId;
    const ids = [me];
    const key = monthKey();
    const thisMonth = monthRange(key);
    const lastKey = monthsEnding(key, 2)[0];
    const lastMonth = monthRange(lastKey);

    const [allTime, monthCohort, monthSales, lastMonthSales, monthFollowUps, trend, dueLeads, recent] =
      await Promise.all([
        statusCountsBy(ids),
        statusCountsBy(ids, thisMonth),
        salesClosedBy(ids, thisMonth),
        salesClosedBy(ids, lastMonth),
        followUpsWrittenBy(ids, thisMonth),
        monthlyTrend(ids, monthsEnding(key, 6)),
        PopupForm.find({
          assignedTo: me,
          status: { $nin: CLOSED },
          nextFollowUpAt: { $ne: null, $lt: endOfTodayIST() },
        })
          .select("leadId fullName phone status nextFollowUpAt")
          .sort({ nextFollowUpAt: 1 })
          .limit(8)
          .lean(),
        PopupForm.find({ assignedTo: me })
          .select("leadId fullName phone city status assignedAt createdAt")
          .sort({ assignedAt: -1, createdAt: -1 })
          .limit(8)
          .lean(),
      ]);

    const totals = allTime[me] || { total: 0, byStatus: emptyStatusCounts() };
    const month = monthCohort[me] || { total: 0, byStatus: emptyStatusCounts() };

    return res.status(200).json({
      success: true,
      month: key,
      totals: {
        assigned: totals.total,
        byStatus: totals.byStatus,
        sales: totals.byStatus.Converted,
        conversion: rate(totals.byStatus.Converted, totals.total),
        untouched: totals.byStatus.New,
      },
      thisMonth: {
        assigned: month.total,
        sales: monthSales[me] || 0,
        lastMonthSales: lastMonthSales[me] || 0,
        followUps: monthFollowUps[me] || 0,
        conversion: rate(month.byStatus.Converted, month.total),
      },
      trend,
      dueLeads,
      recent,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
