import dbConnect from "@/lib/dbConnect";
import SubAdmin from "@/models/SubAdmin";
import { requireAdminApi } from "@/lib/requireAdminApi";

/**
 * Who a lead can be handed to: the active sub-admins who are allowed into the
 * Leads page at all. Assigning a lead to someone who cannot open it would
 * just lose the lead.
 *
 * Only the name is returned — the sub-admin documents hold credentials.
 */
export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ success: false, message: "Method not allowed" });

  const admin = requireAdminApi(req, "leads");
  if (!admin) return res.status(401).json({ success: false, message: "Not authorised" });

  try {
    await dbConnect();
    const people = await SubAdmin.find({ status: "active", permissions: "leads" })
      .select("name")
      .sort({ name: 1 })
      .lean();

    return res.status(200).json({ success: true, assignees: people });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
