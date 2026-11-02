import { pinInfo } from "@/lib/onlineAdmission/centres";
import { route, fail } from "@/lib/onlineAdmission/server";

export default route({
  async GET(req, res) {
    const x = pinInfo(req.query.pin);
    if (!x) throw fail(404, "Pincode not found");
    res.setHeader("Cache-Control", "public, max-age=86400");
    return {
      pin: x.pin, district: x.district, state: x.state,
      offices: x.offices ? x.offices.split(", ") : [], exact: x.exact,
    };
  },
});
