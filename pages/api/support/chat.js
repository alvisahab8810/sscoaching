import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import SupportChat from "@/models/SupportChat";
import SupportMessage from "@/models/SupportMessage";
import { requireActiveStudent } from "@/lib/studentAuth";
import {
  getSettings,
  autoCloseStale,
  rootOptions,
  startChat,
  studentAction,
  addMessage,
  serializeMessage,
  serializeChatForStudent,
} from "@/lib/support";

/**
 * The student's side of support chat.
 *
 * GET  ?after=<iso>&seen=1   the open chat (or the last closed one) and its messages
 * POST { action: "option", id } | { action: "text", text }
 *      | { action: "new" } | { action: "close" } | { action: "rate", rating }
 */
export default async function handler(req, res) {
  await dbConnect();
  const auth = await requireActiveStudent(req);
  if (!auth.ok) return res.status(auth.status).json({ success: false, message: auth.message });
  const studentId = new mongoose.Types.ObjectId(auth.id);
  const source = req.headers["x-source"] === "app" ? "app" : "web";

  // The open chat, or else the most recent closed one so its rating can still be given.
  const current = async () =>
    (await SupportChat.findOne({ student: studentId, status: { $ne: "closed" } }).sort({ createdAt: -1 })) ||
    (await SupportChat.findOne({ student: studentId }).sort({ createdAt: -1 }));

  if (req.method === "GET") {
    await autoCloseStale();
    const chat = await current();
    const settings = await getSettings();
    if (!chat) {
      return res.status(200).json({
        success: true,
        chat: null,
        messages: [],
        greeting: settings.greeting,
        options: await rootOptions(),
      });
    }

    const filter = { chat: chat._id };
    const after = req.query.after ? new Date(req.query.after) : null;
    if (after && !isNaN(after)) filter.createdAt = { $gt: after };
    const messages = await SupportMessage.find(filter).sort({ createdAt: 1 }).limit(500).lean();

    if (req.query.seen === "1" && chat.unreadForStudent) {
      await SupportChat.updateOne({ _id: chat._id }, { $set: { unreadForStudent: 0 } });
      chat.unreadForStudent = 0;
    }

    return res.status(200).json({
      success: true,
      chat: serializeChatForStudent(chat),
      messages: messages.map(serializeMessage),
    });
  }

  if (req.method !== "POST") return res.status(405).end();

  const { action } = req.body || {};
  let chat = await current();

  if (action === "rate") {
    const rating = Number(req.body.rating);
    if (!chat || chat.status !== "closed" || !(rating >= 1 && rating <= 5)) {
      return res.status(400).json({ success: false, message: "Nothing to rate" });
    }
    chat.rating = Math.round(rating);
    await chat.save();
    return res.status(200).json({ success: true, chat: serializeChatForStudent(chat), messages: [] });
  }

  if (action === "close") {
    if (!chat || chat.status === "closed") return res.status(200).json({ success: true, chat: serializeChatForStudent(chat), messages: [] });
    const msg = await addMessage(chat, { from: "system", text: "You ended the chat." });
    chat.status = "closed";
    chat.closedAt = new Date();
    chat.closedBy = "student";
    await chat.save();
    return res.status(200).json({ success: true, chat: serializeChatForStudent(chat), messages: [serializeMessage(msg)] });
  }

  if (action !== "new" && action !== "option" && action !== "text") {
    return res.status(400).json({ success: false, message: "Unknown action" });
  }

  const created = [];
  if (!chat || chat.status === "closed") {
    const student = await StudentUser.findById(studentId).select("name phone").lean();
    const started = await startChat(student, source);
    chat = started.chat;
    created.push(started.greeting);
  } else if (action === "new") {
    // A chat is already open; just hand it back.
    return res.status(200).json({ success: true, chat: serializeChatForStudent(chat), messages: [] });
  }

  if (action === "option") created.push(...(await studentAction(chat, { optionId: String(req.body.id || "") })));
  if (action === "text") created.push(...(await studentAction(chat, { text: req.body.text })));

  const fresh = await SupportChat.findById(chat._id).lean();
  return res.status(200).json({
    success: true,
    chat: serializeChatForStudent(fresh),
    messages: created.map(serializeMessage),
  });
}
