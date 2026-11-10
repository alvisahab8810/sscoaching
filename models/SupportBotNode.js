import mongoose from "mongoose";

/**
 * One entry of the support bot's question tree.
 *
 * Top-level entries (parent null) are the options the bot offers first. An
 * entry with children shows its answer and then its children as the next
 * options. Keywords let a typed question find the entry without clicking.
 */
const SupportBotNodeSchema = new mongoose.Schema(
  {
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "SupportBotNode", default: null },
    title: { type: String, required: true, trim: true },
    answer: { type: String, default: "", trim: true },
    keywords: { type: [String], default: [] },
    linkLabel: { type: String, default: "", trim: true },
    linkUrl: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

SupportBotNodeSchema.index({ parent: 1, order: 1 });

export default mongoose.models.SupportBotNode || mongoose.model("SupportBotNode", SupportBotNodeSchema);
