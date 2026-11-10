import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import SupportChat from "@/models/SupportChat";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { supportAgent, autoCloseStale } from "@/lib/support";

/**
 * What needs the agent's attention, for the alert shown on every dashboard
 * page. Small on purpose: it is polled every few seconds.
 *
 * GET -> { waiting, mine, unread }
 */
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  await dbConnect();
  const agent = await supportAgent(requireAdminApi(req));
  if (!agent) return res.status(403).json({ success: false, message: "No access to support" });

  await autoCloseStale();
  const me = new mongoose.Types.ObjectId(agent.id);
  const [waiting, mine] = await Promise.all([
    SupportChat.countDocuments({ status: "waiting" }),
    SupportChat.aggregate([
      { $match: { status: "assigned", agentId: me } },
      { $group: { _id: null, chats: { $sum: 1 }, unread: { $sum: "$unreadForAgent" } } },
    ]),
  ]);

  return res.status(200).json({
    success: true,
    waiting,
    mine: mine[0]?.chats || 0,
    unread: mine[0]?.unread || 0,
  });
}
