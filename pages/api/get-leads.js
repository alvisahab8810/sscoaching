import dbConnect from "@/lib/dbConnect";
import PopupForm from "@/models/PopupForm";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { leadAccess, clearSubAdminCookie } from "@/lib/salesAccess";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

  const admin = requireAdminApi(req, "leads");
  if (!admin) return res.status(401).json({ success: false, message: "Not authorised" });

  try {
    await dbConnect();

    // The Follow-ups tracker only ever wants the leads in that one status, and
    // asking for all of them would ship the whole collection to the browser.
    const query = {};
    if (req.query.status) query.status = req.query.status;

    // A sales person sees only the leads assigned to them.
    const access = await leadAccess(admin);
    if (!access.allowed) {
      clearSubAdminCookie(res);
      return res.status(401).json({ success: false, message: "Account inactive" });
    }
    if (access.salesId) query.assignedTo = access.salesId;

    const leads = await PopupForm.find(query)
      .select("-gclid -fbclid -referrer -utmSource -utmMedium")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({ success: true, leads });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
