import Application from "@/models/onlineAdmission/Application";
import Payment from "@/models/onlineAdmission/Payment";
import Interest from "@/models/onlineAdmission/Interest";
import { STATUSES } from "@/lib/onlineAdmission/config";
import { BUNDLED_SYNCED_AT } from "@/lib/onlineAdmission/centres";
import { route, requireStaff, getSettings } from "@/lib/onlineAdmission/server";

export default route({
  async GET(req) {
    const staff = requireStaff(req);
    const [by, mine, revenue, interests, settings] = await Promise.all([
      Application.aggregate([{ $group: { _id: "$status", n: { $sum: 1 } } }]),
      Application.countDocuments({ "consultant.id": staff.id, status: { $nin: ["exam_fee_paid", "cancelled"] } }),
      Payment.aggregate([{ $match: { status: "paid" } }, { $group: { _id: null, total: { $sum: "$amount" } } }]),
      Interest.estimatedDocumentCount(),
      getSettings(),
    ]);
    return {
      by_status: Object.fromEntries(by.map((x) => [x._id, x.n])),
      statuses: STATUSES,
      mine,
      revenue: revenue[0]?.total || 0,
      interests,
      centres_synced_at: settings.centres_synced_at || BUNDLED_SYNCED_AT,
      is_admin: staff.isAdmin,
    };
  },
});
