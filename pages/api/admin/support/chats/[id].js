import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import SupportChat from "@/models/SupportChat";
import SupportMessage from "@/models/SupportMessage";
import StudentUser from "@/models/StudentUser";
import Enrollment from "@/models/EnrollmentModel";
import "@/models/CourseModel";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { logActivity } from "@/lib/logActivity";
import {
  supportAgent,
  addMessage,
  firstName,
  serializeMessage,
  serializeChatForAgent,
  pushToStudent,
} from "@/lib/support";

/**
 * One support chat, for the agent.
 *
 * GET  ?after=<iso>   the chat, its messages and the student's details
 * POST { action: "reply", text } | { action: "claim" } | { action: "transfer", agentId }
 *      | { action: "close" } | { action: "note", text } | { action: "call" }
 */
export default async function handler(req, res) {
  await dbConnect();
  const admin = requireAdminApi(req);
  const agent = await supportAgent(admin);
  if (!agent) return res.status(403).json({ success: false, message: "No access to support" });

  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) return res.status(404).json({ success: false, message: "Chat not found" });
  const chat = await SupportChat.findById(id);
  if (!chat) return res.status(404).json({ success: false, message: "Chat not found" });

  // An agent works on waiting chats and their own; the super admin on any.
  const isMine = chat.agentId && String(chat.agentId) === agent.id;
  if (!agent.isSuper && chat.status !== "waiting" && !isMine) {
    return res.status(403).json({ success: false, message: "This chat is with another agent" });
  }

  if (req.method === "GET") {
    const filter = { chat: chat._id };
    const after = req.query.after ? new Date(req.query.after) : null;
    if (after && !isNaN(after)) filter.createdAt = { $gt: after };
    const messages = await SupportMessage.find(filter).sort({ createdAt: 1 }).limit(1000).lean();

    if (isMine && chat.unreadForAgent) {
      chat.unreadForAgent = 0;
      await SupportChat.updateOne({ _id: chat._id }, { $set: { unreadForAgent: 0 } });
    }

    // Student details only on the first load, not on every poll.
    let student = null;
    if (!after) {
      const [s, enrollments, previous] = await Promise.all([
        StudentUser.findById(chat.student).select("name phone email className isActive deletedAt createdAt").lean(),
        Enrollment.find({ student: chat.student })
          .sort({ createdAt: -1 })
          .populate("course", "title")
          .select("course type status amountPaid source createdAt")
          .lean(),
        SupportChat.countDocuments({ student: chat.student, _id: { $ne: chat._id } }),
      ]);
      student = s && {
        _id: String(s._id),
        name: s.name,
        phone: s.deletedAt ? "" : s.phone,
        email: s.deletedAt ? "" : s.email,
        className: s.className || "",
        active: s.isActive !== false && !s.deletedAt,
        joinedAt: s.createdAt,
        previousChats: previous,
        enrollments: enrollments.map((e) => ({
          _id: String(e._id),
          course: e.course?.title || "Removed course",
          type: e.type,
          status: e.status,
          amountPaid: e.amountPaid || 0,
          source: e.source,
          createdAt: e.createdAt,
        })),
      };
    }

    return res.status(200).json({
      success: true,
      chat: serializeChatForAgent(chat),
      messages: messages.map(serializeMessage),
      student,
    });
  }

  if (req.method !== "POST") return res.status(405).end();

  const { action } = req.body || {};
  const meId = new mongoose.Types.ObjectId(agent.id);
  const created = [];
  const log = (description) =>
    logActivity(req, { feature: "support", action: "update", entityId: chat._id, entityType: "SupportChat", description });

  // Takes a waiting chat. The status check in the filter makes sure two agents
  // clicking at the same moment cannot both get it.
  const claim = async () => {
    const now = new Date();
    const r = await SupportChat.updateOne(
      { _id: chat._id, status: "waiting" },
      { $set: { status: "assigned", agentId: meId, agentName: agent.name, assignedAt: now } }
    );
    if (!r.modifiedCount) return false;
    Object.assign(chat, { status: "assigned", agentId: meId, agentName: agent.name, assignedAt: now });
    created.push(await addMessage(chat, { from: "system", text: `${firstName(agent.name)} from our support team has joined the chat.` }));
    await log(`Took support chat with ${chat.studentName}`);
    return true;
  };

  if (action === "claim") {
    if (chat.status !== "waiting") return res.status(409).json({ success: false, message: "Someone else has already taken this chat" });
    if (!(await claim())) return res.status(409).json({ success: false, message: "Someone else has already taken this chat" });
  } else if (action === "reply") {
    const text = String(req.body.text || "").trim().slice(0, 4000);
    if (!text) return res.status(400).json({ success: false, message: "Type a message" });
    if (chat.status === "closed") return res.status(400).json({ success: false, message: "This chat is closed" });
    if (chat.status === "waiting" && !(await claim())) {
      return res.status(409).json({ success: false, message: "Someone else has already taken this chat" });
    }
    if (chat.status === "bot") return res.status(400).json({ success: false, message: "The student is still with the bot" });
    if (String(chat.agentId) !== agent.id) {
      return res.status(403).json({ success: false, message: "Transfer the chat to yourself before replying" });
    }
    // Only the first unread reply sends a push, so a burst of messages is one notification.
    const quiet = !chat.unreadForStudent;
    created.push(await addMessage(chat, { from: "agent", senderName: firstName(agent.name), text }));
    if (quiet) pushToStudent(chat, `${firstName(agent.name)} from SS Coaching support`, text);
    if (!chat.firstReplyAt) await SupportChat.updateOne({ _id: chat._id }, { $set: { firstReplyAt: new Date() } });
  } else if (action === "transfer") {
    if (chat.status === "closed" || chat.status === "bot") return res.status(400).json({ success: false, message: "Only open chats can be transferred" });
    // "me" takes the chat over; anything else must be an active support agent.
    const wanted = String(req.body.agentId || "");
    const to =
      wanted === "me"
        ? agent
        : mongoose.isValidObjectId(wanted)
          ? await supportAgent({ role: "sub", id: wanted })
          : null;
    if (!to) return res.status(400).json({ success: false, message: "Pick an active support agent" });
    await SupportChat.updateOne(
      { _id: chat._id },
      { $set: { status: "assigned", agentId: new mongoose.Types.ObjectId(to.id), agentName: to.name, assignedAt: new Date(), unreadForAgent: 0 } }
    );
    Object.assign(chat, { status: "assigned", agentName: to.name });
    created.push(await addMessage(chat, { from: "system", text: `${firstName(to.name)} from our support team has joined the chat.` }));
    await log(`Transferred support chat with ${chat.studentName} to ${to.name}`);
  } else if (action === "close") {
    if (chat.status === "closed") return res.status(400).json({ success: false, message: "Already closed" });
    created.push(await addMessage(chat, { from: "system", text: "The chat has been closed. Please rate your experience." }));
    await SupportChat.updateOne(
      { _id: chat._id },
      { $set: { status: "closed", closedAt: new Date(), closedBy: "agent", unreadForAgent: 0 } }
    );
    await log(`Closed support chat with ${chat.studentName}`);
  } else if (action === "note" || action === "call") {
    const text =
      action === "call"
        ? `Called the student on ${chat.studentPhone || "their number"}`
        : String(req.body.text || "").trim().slice(0, 2000);
    if (!text) return res.status(400).json({ success: false, message: "Write a note" });
    await SupportChat.updateOne(
      { _id: chat._id },
      { $push: { notes: { byId: meId, byName: agent.name, text } } }
    );
    if (action === "call") await log(`Called ${chat.studentName} (${chat.studentPhone}) from support chat`);
  } else {
    return res.status(400).json({ success: false, message: "Unknown action" });
  }

  const fresh = await SupportChat.findById(chat._id).lean();
  return res.status(200).json({
    success: true,
    chat: serializeChatForAgent(fresh),
    messages: created.map(serializeMessage),
  });
}
