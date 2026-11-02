import Interest from "@/models/onlineAdmission/Interest";
import { route, requireStaff } from "@/lib/onlineAdmission/server";

export default route({
  async GET(req) {
    requireStaff(req);
    const rows = await Interest.find({}).sort({ created_at: -1 }).limit(2000).lean();
    return {
      interests: rows.map((r) => ({ id: String(r._id), name: r.name, mobile: r.mobile, class: r.class, pincode: r.pincode, created_at: r.created_at })),
    };
  },
});
