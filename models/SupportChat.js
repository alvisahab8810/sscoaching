import mongoose from "mongoose";

/**
 * A student's support conversation.
 *
 *   bot      — the student is talking to the bot
 *   waiting  — the student asked for an agent and nobody has it yet
 *   assigned — an agent has the chat
 *   closed   — finished; the student may rate it
 *
 * A student has at most one chat that is not closed.
 */
const NoteSchema = new mongoose.Schema(
  {
    byId: { type: mongoose.Schema.Types.ObjectId, default: null },
    byName: { type: String, default: "" },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const SupportChatSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "StudentUser", required: true },
    studentName: { type: String, default: "" },
    studentPhone: { type: String, default: "" },
    source: { type: String, enum: ["web", "app"], default: "web" },
    status: { type: String, enum: ["bot", "waiting", "assigned", "closed"], default: "bot" },

    // null agent with a role of "super" means the super admin took it.
    agentId: { type: mongoose.Schema.Types.ObjectId, default: null },
    agentName: { type: String, default: "" },

    // Typed questions the bot could not answer in a row; after two it offers an agent.
    misses: { type: Number, default: 0 },

    lastMessageAt: { type: Date, default: Date.now },
    lastMessage: { type: String, default: "" },
    unreadForAgent: { type: Number, default: 0 },
    unreadForStudent: { type: Number, default: 0 },

    handoverAt: { type: Date, default: null },
    assignedAt: { type: Date, default: null },
    firstReplyAt: { type: Date, default: null },
    closedAt: { type: Date, default: null },
    closedBy: { type: String, default: "" },

    rating: { type: Number, min: 1, max: 5, default: null },
    notes: { type: [NoteSchema], default: [] },
  },
  { timestamps: true }
);

SupportChatSchema.index({ student: 1, status: 1 });
SupportChatSchema.index({ status: 1, lastMessageAt: -1 });
SupportChatSchema.index({ agentId: 1, status: 1, lastMessageAt: -1 });

export default mongoose.models.SupportChat || mongoose.model("SupportChat", SupportChatSchema);
