import cookie from "cookie";
import SubAdmin from "@/models/SubAdmin";

/**
 * What a signed-in admin may do with leads.
 *
 * The JWT alone is not trusted for this: it lives for 8 hours, and an account
 * the admin has just deactivated or turned into a sales account must take
 * effect on the very next request. So a sub-admin is read back from the
 * database every time.
 *
 *   { allowed: false }                    — account deleted or inactive
 *   { allowed: true, salesId: null }      — super admin or regular sub-admin
 *   { allowed: true, salesId: "<id>" }    — sales person: own leads only
 */
export async function leadAccess(admin) {
  if (!admin || admin.role !== "sub") return { allowed: true, salesId: null };

  const me = await SubAdmin.findById(admin.id).select("status isSales").lean();
  if (!me || me.status !== "active") return { allowed: false };

  return { allowed: true, salesId: me.isSales ? String(me._id) : null };
}

// Ends a sub-admin's session from the server side.
export function clearSubAdminCookie(res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("subadmin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })
  );
}
