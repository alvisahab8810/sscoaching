import dbConnect from "@/lib/dbConnect";
import SubAdmin from "@/models/SubAdmin";
import { requireAdminApi } from "@/lib/requireAdminApi";

/**
 * The signed-in user's own account details, for the Profile page.
 * Sub-admins and sales people get their record (never the password);
 * the super admin gets what the session holds.
 */
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ success: false, message: "Method not allowed" });

  const admin = requireAdminApi(req);
  if (!admin) return res.status(401).json({ success: false, message: "Not authenticated" });

  if (admin.role === "super") {
    return res.status(200).json({ success: true, data: { role: "super", email: admin.email || "" } });
  }

  try {
    await dbConnect();
    const me = await SubAdmin.findById(admin.id)
      .select("name username email phone status permissions isSales createdAt updatedAt")
      .lean();
    if (!me) return res.status(404).json({ success: false, message: "Account not found" });
    return res.status(200).json({ success: true, data: { role: "sub", ...me } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
