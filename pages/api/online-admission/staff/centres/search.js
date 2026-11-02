import { searchCentres } from "@/lib/onlineAdmission/centres";
import { route, fail, requireStaff } from "@/lib/onlineAdmission/server";

export default route({
  async GET(req) {
    requireStaff(req);
    const out = await searchCentres(req.query);
    if (!out) throw fail(404, "Pincode not found. Check the 6 digits");
    return out;
  },
});
