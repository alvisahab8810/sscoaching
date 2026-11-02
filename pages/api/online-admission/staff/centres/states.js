import { centreStates, BUNDLED_SYNCED_AT } from "@/lib/onlineAdmission/centres";
import { route, requireStaff, getSettings } from "@/lib/onlineAdmission/server";

export default route({
  async GET(req) {
    requireStaff(req);
    const [data, settings] = await Promise.all([centreStates(), getSettings()]);
    return { synced_at: settings.centres_synced_at || BUNDLED_SYNCED_AT, ...data };
  },
});
