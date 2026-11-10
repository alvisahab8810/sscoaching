import mongoose from "mongoose";

/**
 * One message in a support chat.
 *
 * "options" are the buttons a bot message offers; "system" messages are status
 * lines such as "Rahul joined the chat".
 */
const OptionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
  },
  { _id: false }
);

const SupportMessageSchema = new mongoose.Schema(
  {
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "SupportChat", required: true },
    from: { type: String, enum: ["student", "bot", "agent", "system"], required: true },
    senderName: { type: String, default: "" },
    text: { type: String, default: "" },
    linkLabel: { type: String, default: "" },
    linkUrl: { type: String, default: "" },
    options: { type: [OptionSchema], default: [] },
  },
  { timestamps: true }
);

SupportMessageSchema.index({ chat: 1, createdAt: 1 });

export default mongoose.models.SupportMessage || mongoose.model("SupportMessage", SupportMessageSchema);
