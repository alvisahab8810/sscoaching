// Consultant queue: filter by status list, "mine", or a search term.
import Application from "@/models/onlineAdmission/Application";
import Applicant from "@/models/onlineAdmission/Applicant";
import { STATUS_BY_KEY } from "@/lib/onlineAdmission/config";
import { route, requireStaff } from "@/lib/onlineAdmission/server";

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default route({
  async GET(req) {
    const staff = requireStaff(req);
    const q = req.query;
    const filter = {};
    if (q.status) filter.status = { $in: String(q.status).split(",").filter((s) => STATUS_BY_KEY[s]) };
    if (q.mine === "1") filter["consultant.id"] = staff.id;
    const term = String(q.q || "").trim();
    if (term) {
      const re = new RegExp(escape(term), "i");
      const byMobile = await Applicant.find({ mobile: re }).select("_id").lean();
      filter.$or = [
        { ref_no: re }, { "form.full_name": re }, { enrollment_no: re }, { "form.mobile": re },
        { applicant: { $in: byMobile.map((x) => x._id) } },
      ];
    }
    const apps = await Application.find(filter).sort({ updated_at: -1 }).limit(500).populate("applicant", "mobile").lean();
    return {
      applications: apps.map((a) => {
        const ad = a.form?.address || {};
        return {
          id: String(a._id), ref_no: a.ref_no, class: a.class, stream: a.stream, block: a.block, status: a.status,
          price: a.price, updated_at: a.updated_at, enrollment_no: a.enrollment_no, name: a.form?.full_name || "",
          district: ad.district, state: ad.state, pincode: ad.pincode, mobile: a.applicant?.mobile,
          consultant: a.consultant?.name || null, status_label: STATUS_BY_KEY[a.status]?.label,
        };
      }),
    };
  },
});
