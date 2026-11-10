import mongoose from "mongoose";

/**
 * Support chat settings: a single document.
 *
 * Office hours are in IST. Days use JavaScript numbering (0 = Sunday).
 * "lastAgentId" is the round-robin pointer: the next chat goes to the online
 * agent after this one.
 */
const SupportSettingsSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "main" },
    greeting: {
      type: String,
      default: "Hello! I am the SS Coaching assistant. What do you need help with?",
    },
    hoursEnabled: { type: Boolean, default: true },
    days: { type: [Number], default: [1, 2, 3, 4, 5, 6] },
    start: { type: String, default: "10:00" },
    end: { type: String, default: "19:00" },
    offHoursMessage: {
      type: String,
      default:
        "Our support team is available Monday to Saturday, 10 AM to 7 PM. We have noted your request and will call you back during working hours.",
    },
    noAgentMessage: {
      type: String,
      default: "All our agents are busy right now. Please stay in the chat, the next free agent will reply here.",
    },
    // An open chat with no reply for this long is closed on its own.
    autoCloseMinutes: { type: Number, default: 5, min: 5, max: 1440 },
    lastAgentId: { type: mongoose.Schema.Types.ObjectId, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.SupportSettings || mongoose.model("SupportSettings", SupportSettingsSchema);
