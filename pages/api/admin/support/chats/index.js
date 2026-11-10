import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import SupportChat from "@/models/SupportChat";
import SubAdmin from "@/models/SubAdmin";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { supportAgent, serializeChatForAgent, onlineAgents, autoCloseStale } from "@/lib/support";

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * The support inbox.
 *
 * GET ?box=waiting|mine|all|closed&q=
 *   waiting — handed over, nobody has it yet (every agent sees these)
 *   mine    — open chats assigned to me
 *   all     — every open chat (super admin only)
 *   closed  — finished chats; an agent sees only their own
 */
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  await dbConnect();
  const agent = await supportAgent(requireAdminApi(req));
  if (!agent) return res.status(403).json({ success: false, message: "No access to support" });

  await autoCloseStale();
  const me = new mongoose.Types.ObjectId(agent.id);
  const box = String(req.query.box || "mine");
  const filter = {};
  if (box === "waiting") filter.status = "waiting";
  else if (box === "all" && agent.isSuper) filter.status = { $in: ["waiting", "assigned"] };
  else if (box === "closed") {
    filter.status = "closed";
    if (!agent.isSuper) filter.agentId = me;
  } else {
    filter.status = "assigned";
    filter.agentId = me;
  }

  const q = String(req.query.q || "").trim();
  if (q) {
    const rx = new RegExp(escapeRegex(q), "i");
    filter.$or = [{ studentName: rx }, { studentPhone: rx }];
  }

  const [chats, waiting, mine, online, agents] = await Promise.all([
    SupportChat.find(filter).sort({ lastMessageAt: -1 }).limit(box === "closed" ? 100 : 300).lean(),
    SupportChat.countDocuments({ status: "waiting" }),
    SupportChat.countDocuments({ status: "assigned", agentId: me }),
    onlineAgents(),
    SubAdmin.find({ status: "active", permissions: "support" }).select("name").sort({ name: 1 }).lean(),
  ]);
  const onlineIds = new Set(online.map((a) => String(a._id)));

  return res.status(200).json({
    success: true,
    me: agent,
    counts: { waiting, mine },
    // Every support agent, for the transfer menu, with who is online now.
    agents: agents.map((a) => ({ _id: String(a._id), name: a.name, online: onlineIds.has(String(a._id)) })),
    data: chats.map(serializeChatForAgent),
  });
}
