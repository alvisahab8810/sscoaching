import dbConnect from "@/lib/dbConnect";
import { requireActiveStudent } from "@/lib/studentAuth";
import { quote, availableCoupons } from "@/lib/checkout";

/**
 * Prices a cart before payment, for the checkout page and the app.
 *
 * POST { courseIds, couponCode?, useWallet? }
 *   -> { quote, coupons } where coupons are the public offers for this cart.
 *      Pass offers: false to skip listing them (e.g. when only toggling wallet).
 */
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success: false, message: "Method not allowed" });
  await dbConnect();

  const session = await requireActiveStudent(req);
  if (!session.ok) return res.status(session.status).json({ success: false, message: session.message });

  const { courseIds, couponCode = "", useWallet = false, offers = true } = req.body || {};
  if (!Array.isArray(courseIds) || !courseIds.length || courseIds.length > 50) {
    return res.status(400).json({ success: false, message: "No courses to price" });
  }
  const source = req.headers["x-source"] === "app" ? "app" : "web";

  try {
    const [q, coupons] = await Promise.all([
      quote({ studentId: session.id, courseIds, couponCode, useWallet: !!useWallet, source }),
      offers ? availableCoupons({ studentId: session.id, courseIds, source }) : Promise.resolve(null),
    ]);
    return res.status(200).json({ success: true, quote: q, coupons });
  } catch (err) {
    console.error("checkout quote:", err);
    return res.status(500).json({ success: false, message: "Could not price your cart" });
  }
}
