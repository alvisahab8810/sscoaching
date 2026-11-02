import { route, getApplicant } from "@/lib/onlineAdmission/server";

export default route({
  async GET(req) {
    const a = await getApplicant(req);
    return { user: a ? { id: String(a._id), name: a.name, mobile: a.mobile } : null };
  },
});
