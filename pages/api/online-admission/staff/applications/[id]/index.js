import { route, requireStaff, staffApplication, staffView, reconcileRazorpay } from "@/lib/onlineAdmission/server";

export default route({
  async GET(req) {
    requireStaff(req);
    let app = await staffApplication(req);
    if (await reconcileRazorpay(app)) app = await staffApplication(req);
    return staffView(app);
  },
});
