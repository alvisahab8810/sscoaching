/**
 * Support chat: the bot, the handover to an agent and the shapes sent to the
 * website widget and the dashboard inbox.
 */
import mongoose from "mongoose";
import axios from "axios";
import StudentUser from "@/models/StudentUser";
import SupportBotNode from "@/models/SupportBotNode";
import SupportChat from "@/models/SupportChat";
import SupportMessage from "@/models/SupportMessage";
import SupportSettings from "@/models/SupportSettings";
import SubAdmin from "@/models/SubAdmin";
import SubAdminLiveSession from "@/models/SubAdminLiveSession";

export const AGENT_OPTION = "__agent";
export const MENU_OPTION = "__menu";
const AGENT_TITLE = "Talk to support team";
const MENU_TITLE = "Main menu";

// An agent counts as online while their dashboard heartbeat (every 30s) is fresh.
const ONLINE_MS = 90 * 1000;

// Settings are read with their defaults even before the admin has saved them,
// so nothing is written to the database just by reading.
export async function getSettings() {
  const doc = await SupportSettings.findById("main").lean();
  return doc || new SupportSettings().toObject();
}

// Is support open right now? Hours and days are in IST.
export function isWithinHours(settings, now = new Date()) {
  if (!settings.hoursEnabled) return true;
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  const day = ist.getUTCDay();
  if (!(settings.days || []).includes(day)) return false;
  const mins = ist.getUTCHours() * 60 + ist.getUTCMinutes();
  const toMins = (hhmm) => {
    const [h, m] = String(hhmm || "0:0").split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  };
  return mins >= toMins(settings.start) && mins < toMins(settings.end);
}

async function nodeOptions(parentId) {
  const nodes = await SupportBotNode.find({ parent: parentId || null, active: true })
    .sort({ order: 1, createdAt: 1 })
    .select("title")
    .lean();
  return nodes.map((n) => ({ id: String(n._id), title: n.title }));
}

export async function rootOptions() {
  return [...(await nodeOptions(null)), { id: AGENT_OPTION, title: AGENT_TITLE }];
}

/**
 * Saves a message and keeps the chat's preview and unread counters in step.
 */
export async function addMessage(chat, fields) {
  const msg = await SupportMessage.create({ chat: chat._id, ...fields });
  const inc = {};
  if (fields.from === "student" && chat.status !== "bot") inc.unreadForAgent = 1;
  if (fields.from === "agent") inc.unreadForStudent = 1;
  await SupportChat.updateOne(
    { _id: chat._id },
    {
      $set: { lastMessageAt: msg.createdAt, lastMessage: String(fields.text || "").slice(0, 140) },
      ...(Object.keys(inc).length ? { $inc: inc } : {}),
    }
  );
  return msg;
}

/**
 * A push to the student's phone when an agent writes, so they come back to
 * the chat. Tapping it opens the SupportChat screen in the app. Never throws:
 * a failed push must not fail the reply.
 */
export async function pushToStudent(chat, title, body) {
  try {
    const student = await StudentUser.findById(chat.student).select("expoPushToken").lean();
    if (!student?.expoPushToken) return;
    await axios.post(
      "https://exp.host/--/api/v2/push/send",
      [{ to: student.expoPushToken, title, body: String(body).slice(0, 150), data: { screen: "SupportChat" }, sound: "default", priority: "high", channelId: "default" }],
      { headers: { "Content-Type": "application/json", Accept: "application/json" }, timeout: 8000 }
    );
  } catch (err) {
    console.error("Support push failed:", err?.response?.data || err.message);
  }
}

const AUTO_CLOSE_TEXT = "This chat was closed because there was no reply for a while. Please rate your experience.";
const WAITING_CLOSE_HOURS = 24;
let lastSweep = 0;

/**
 * Closes chats that have gone quiet. There is no scheduler, so this runs from
 * the polled GET endpoints, at most once a minute per server.
 *
 *   bot      — no activity for the set minutes
 *   assigned — no message from either side for the set minutes
 *   waiting  — nobody took it within a day
 */
export async function autoCloseStale() {
  if (Date.now() - lastSweep < 60 * 1000) return;
  lastSweep = Date.now();
  try {
    const settings = await getSettings();
    const idle = new Date(Date.now() - (settings.autoCloseMinutes || 5) * 60 * 1000);
    const day = new Date(Date.now() - WAITING_CLOSE_HOURS * 60 * 60 * 1000);
    const stale = await SupportChat.find({
      $or: [
        { status: "bot", lastMessageAt: { $lt: idle } },
        { status: "assigned", lastMessageAt: { $lt: idle } },
        { status: "waiting", lastMessageAt: { $lt: day } },
      ],
    }).limit(200);
    for (const chat of stale) {
      await addMessage(chat, { from: "system", text: AUTO_CLOSE_TEXT });
      await SupportChat.updateOne(
        { _id: chat._id, status: chat.status },
        { $set: { status: "closed", closedAt: new Date(), closedBy: "auto", unreadForAgent: 0 } }
      );
    }
  } catch (err) {
    console.error("Support auto-close failed:", err);
  }
}

// The bot's answer for one entry of the tree, with what can be asked next.
async function answerFor(chat, node) {
  const children = await nodeOptions(node._id);
  return addMessage(chat, {
    from: "bot",
    text: node.answer || node.title,
    linkLabel: node.linkLabel || "",
    linkUrl: node.linkUrl || "",
    options: [...children, { id: MENU_OPTION, title: MENU_TITLE }, { id: AGENT_OPTION, title: AGENT_TITLE }],
  });
}

const normalize = (s) => String(s || "").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();

// The tree entry whose keywords best match a typed question, or null.
async function matchQuestion(text) {
  const q = ` ${normalize(text)} `;
  if (!q.trim()) return null;
  const nodes = await SupportBotNode.find({ active: true }).select("title answer keywords linkLabel linkUrl").lean();
  let best = null;
  let bestScore = 0;
  for (const n of nodes) {
    let score = 0;
    for (const k of n.keywords || []) {
      const kw = normalize(k);
      if (kw && q.includes(` ${kw} `)) score += kw.split(" ").length + 1;
    }
    if (q.includes(` ${normalize(n.title)} `)) score += 3;
    if (score > bestScore) {
      best = n;
      bestScore = score;
    }
  }
  return best;
}

/**
 * Support agents who are online now: active sub-admins with the "support"
 * permission and a fresh dashboard heartbeat.
 */
export async function onlineAgents() {
  const agents = await SubAdmin.find({ status: "active", permissions: "support" }).select("name").sort({ _id: 1 }).lean();
  if (!agents.length) return [];
  const live = await SubAdminLiveSession.find({
    subAdminId: { $in: agents.map((a) => a._id) },
    lastSeen: { $gte: new Date(Date.now() - ONLINE_MS) },
  })
    .select("subAdminId")
    .lean();
  const on = new Set(live.map((s) => String(s.subAdminId)));
  return agents.filter((a) => on.has(String(a._id)));
}

// Next online agent after the one who got the previous chat.
async function pickAgent() {
  const agents = await onlineAgents();
  if (!agents.length) return null;
  const settings = await getSettings();
  const last = String(settings.lastAgentId || "");
  const idx = agents.findIndex((a) => String(a._id) === last);
  const next = agents[(idx + 1) % agents.length];
  await SupportSettings.updateOne({ _id: "main" }, { $set: { lastAgentId: next._id } }, { upsert: true });
  return next;
}

/**
 * The student asked for a person. Inside office hours the chat goes to the
 * next online agent, otherwise it waits for whoever picks it up first.
 */
async function handover(chat) {
  const out = [];
  const settings = await getSettings();
  const now = new Date();
  out.push(await addMessage(chat, { from: "system", text: "You asked to talk to our support team." }));

  if (!isWithinHours(settings, now)) {
    await SupportChat.updateOne({ _id: chat._id }, { $set: { status: "waiting", handoverAt: now } });
    out.push(await addMessage(chat, { from: "bot", text: settings.offHoursMessage }));
    return out;
  }

  const agent = await pickAgent();
  if (!agent) {
    await SupportChat.updateOne({ _id: chat._id }, { $set: { status: "waiting", handoverAt: now } });
    out.push(await addMessage(chat, { from: "bot", text: settings.noAgentMessage }));
    return out;
  }

  await SupportChat.updateOne(
    { _id: chat._id },
    { $set: { status: "assigned", handoverAt: now, assignedAt: now, agentId: agent._id, agentName: agent.name } }
  );
  out.push(await addMessage(chat, { from: "system", text: `${firstName(agent.name)} from our support team has joined the chat.` }));
  return out;
}

export const firstName = (name) => String(name || "Support").trim().split(/\s+/)[0];

/**
 * Who may work the support inbox. The super admin always; a sub-admin while
 * the account is active and has the "support" permission. The permission is
 * read from the database, so granting or removing it works without a re-login.
 * Returns { id, name, isSuper } or null.
 */
export async function supportAgent(admin) {
  if (!admin) return null;
  if (admin.role === "super") return { id: String(admin.id), name: "Support Team", isSuper: true };
  const me = await SubAdmin.findById(admin.id).select("name status permissions").lean();
  if (!me || me.status !== "active" || !(me.permissions || []).includes("support")) return null;
  return { id: String(me._id), name: me.name, isSuper: false };
}

/**
 * Handles one thing the student did: clicked an option or typed a message.
 * Returns the messages it created, in order.
 */
export async function studentAction(chat, { optionId, text }) {
  const out = [];

  if (optionId) {
    if (chat.status !== "bot") return out;
    if (optionId === AGENT_OPTION) {
      out.push(await addMessage(chat, { from: "student", text: AGENT_TITLE }));
      out.push(...(await handover(chat)));
      return out;
    }
    if (optionId === MENU_OPTION) {
      const settings = await getSettings();
      out.push(await addMessage(chat, { from: "student", text: MENU_TITLE }));
      out.push(await addMessage(chat, { from: "bot", text: settings.greeting, options: await rootOptions() }));
      return out;
    }
    if (!mongoose.isValidObjectId(optionId)) return out;
    const node = await SupportBotNode.findOne({ _id: optionId, active: true }).lean();
    if (!node) return out;
    out.push(await addMessage(chat, { from: "student", text: node.title }));
    out.push(await answerFor(chat, node));
    await SupportChat.updateOne({ _id: chat._id }, { $set: { misses: 0 } });
    return out;
  }

  const clean = String(text || "").trim().slice(0, 2000);
  if (!clean) return out;
  out.push(await addMessage(chat, { from: "student", text: clean }));
  if (chat.status !== "bot") return out;

  const node = await matchQuestion(clean);
  if (node) {
    await SupportChat.updateOne({ _id: chat._id }, { $set: { misses: 0 } });
    out.push(await answerFor(chat, node));
    return out;
  }

  const misses = (chat.misses || 0) + 1;
  await SupportChat.updateOne({ _id: chat._id }, { $set: { misses } });
  if (misses >= 2) {
    out.push(
      await addMessage(chat, {
        from: "bot",
        text: "I could not find an answer to that. Would you like to talk to our support team?",
        options: [{ id: AGENT_OPTION, title: AGENT_TITLE }, { id: MENU_OPTION, title: MENU_TITLE }],
      })
    );
  } else {
    out.push(
      await addMessage(chat, {
        from: "bot",
        text: "Sorry, I did not understand that. Please choose one of the options below, or ask in other words.",
        options: await rootOptions(),
      })
    );
  }
  return out;
}

// Starts a chat with the greeting as its first message.
export async function startChat(student, source = "web") {
  const settings = await getSettings();
  const chat = await SupportChat.create({
    student: student._id,
    studentName: student.name || "",
    studentPhone: student.phone || "",
    source,
  });
  const greeting = await addMessage(chat, { from: "bot", text: settings.greeting, options: await rootOptions() });
  return { chat, greeting };
}

export function serializeMessage(m) {
  return {
    _id: String(m._id),
    from: m.from,
    senderName: m.senderName || "",
    text: m.text || "",
    linkLabel: m.linkLabel || "",
    linkUrl: m.linkUrl || "",
    options: (m.options || []).map((o) => ({ id: o.id, title: o.title })),
    createdAt: m.createdAt,
  };
}

// What the student sees of a chat. Agent names are first names only.
export function serializeChatForStudent(c) {
  if (!c) return null;
  return {
    _id: String(c._id),
    status: c.status,
    agentName: c.agentName ? firstName(c.agentName) : "",
    rating: c.rating ?? null,
    unread: c.unreadForStudent || 0,
    createdAt: c.createdAt,
    closedAt: c.closedAt,
  };
}

export function serializeChatForAgent(c) {
  return {
    _id: String(c._id),
    student: String(c.student),
    studentName: c.studentName,
    studentPhone: c.studentPhone,
    source: c.source,
    status: c.status,
    agentId: c.agentId ? String(c.agentId) : null,
    agentName: c.agentName || "",
    lastMessage: c.lastMessage,
    lastMessageAt: c.lastMessageAt,
    unread: c.unreadForAgent || 0,
    handoverAt: c.handoverAt,
    assignedAt: c.assignedAt,
    firstReplyAt: c.firstReplyAt,
    closedAt: c.closedAt,
    closedBy: c.closedBy || "",
    rating: c.rating ?? null,
    notes: (c.notes || []).map((n) => ({ _id: String(n._id), byName: n.byName, text: n.text, createdAt: n.createdAt })),
    createdAt: c.createdAt,
  };
}

// A bot entry as typed in the Bot Builder, trimmed and limited.
export function cleanNode(body = {}) {
  const out = {};
  if (body.title !== undefined) out.title = String(body.title).trim().slice(0, 120);
  if (body.answer !== undefined) out.answer = String(body.answer).trim().slice(0, 4000);
  if (body.keywords !== undefined) {
    const list = Array.isArray(body.keywords) ? body.keywords : String(body.keywords).split(",");
    out.keywords = [...new Set(list.map((k) => String(k).trim().toLowerCase()).filter(Boolean))].slice(0, 40);
  }
  if (body.linkLabel !== undefined) out.linkLabel = String(body.linkLabel).trim().slice(0, 60);
  if (body.linkUrl !== undefined) {
    const url = String(body.linkUrl).trim();
    // Only site paths and web links, never javascript: and the like.
    out.linkUrl = /^(https?:\/\/|\/)/i.test(url) ? url.slice(0, 500) : "";
  }
  if (body.order !== undefined) out.order = Number(body.order) || 0;
  if (body.active !== undefined) out.active = !!body.active;
  return out;
}
