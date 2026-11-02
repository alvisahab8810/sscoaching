import { route, endApplicantSession } from "@/lib/onlineAdmission/server";

export default route({
  async POST(req, res) {
    endApplicantSession(res);
    return { ok: true };
  },
});
