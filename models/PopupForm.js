import mongoose from "mongoose";
import { LEAD_STATUSES } from "@/lib/leadPipeline";

/**
 * One slot in the follow-up ladder. The tracker shows the slots side by side,
 * so each entry remembers which column it belongs to; a note can be edited,
 * but a slot is never reordered or removed.
 */
const FollowUpSchema = new mongoose.Schema(
  {
    slot: { type: Number, required: true, min: 1 },
    note: { type: String, default: "", trim: true },
    byId: { type: String, default: "" },
    byName: { type: String, default: "" },
  },
  { timestamps: true, _id: true }
);

const PopupFormSchema = new mongoose.Schema(
  {
    fullName:   { type: String, required: true },
    email:      { type: String, required: false, default: "" },   // hidden in form for now
    phone:      { type: String, required: true },
    lookingFor: { type: String, required: false, default: "" },   // hidden in form for now
    city:       { type: String, required: false, default: "" },   // hidden in form for now
    formType:   { type: String, required: true },

    // A short readable handle the team can quote to each other on a call,
    // which a Mongo ObjectId is not. Assigned once, never reused.
    leadId: { type: String, default: "", index: true },

    // Where the lead came from. "source" is the label shown in the dashboard;
    // the rest is the raw attribution captured on the visitor's landing page.
    source:      { type: String, default: "Unknown" },
    utmSource:   { type: String, default: "" },
    utmMedium:   { type: String, default: "" },
    utmCampaign: { type: String, default: "" },
    gclid:       { type: String, default: "" },
    fbclid:      { type: String, default: "" },
    referrer:    { type: String, default: "" },
    landingPage: { type: String, default: "" },

    // ── Pipeline ──────────────────────────────────────────────────────────
    status: { type: String, enum: LEAD_STATUSES, default: "New" },

    // How many times anyone actually got through to this lead.
    connects: { type: Number, default: 0, min: 0 },

    // Denormalised alongside the id so the list renders without a populate.
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "SubAdmin", default: null },
    assignedToName: { type: String, default: "" },
    assignedAt: { type: Date, default: null },

    // When the lead last moved to Converted, so a sale is counted in the
    // month it was closed rather than the month the enquiry came in.
    convertedAt: { type: Date, default: null },

    // The closing remark written when a follow-up ends in an outcome.
    outcomeNote: { type: String, default: "" },

    // The reminder the tracker sorts and colours by.
    nextFollowUpAt: { type: Date, default: null },
    lastFollowUpAt: { type: Date, default: null },

    followUps: { type: [FollowUpSchema], default: [] },

    // ── Lead score ────────────────────────────────────────────────────────
    // Five yes/no answers, two points each. "scored" is kept separately so a
    // deliberate all-No (a real 0) is not mistaken for an unscored lead.
    scoreAnswers: { type: [Boolean], default: [] },
    scored: { type: Boolean, default: false },
    score: { type: Number, default: 0, min: 0, max: 10 },
    scoredAt: { type: Date, default: null },
    scoredByName: { type: String, default: "" },
  },
  { timestamps: true }
);

PopupFormSchema.index({ status: 1, createdAt: -1 });
PopupFormSchema.index({ assignedTo: 1, createdAt: -1 });

export default mongoose.models.PopupForm ||
  mongoose.model("PopupForm", PopupFormSchema);
