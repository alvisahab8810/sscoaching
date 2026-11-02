import Counter from "@/models/Counter";

const PREFIX = "SS-L-";
const COUNTER_ID = "leadId";

export const formatLeadId = (seq) => `${PREFIX}${String(seq).padStart(4, "0")}`;

/**
 * The next lead id, taken atomically so two forms submitted at the same
 * instant cannot be handed the same number.
 *
 * A failure here must never cost us the lead itself, so the caller gets an
 * empty string back and the lead is saved without an id; the backfill script
 * fills in anything that slipped through.
 */
export async function nextLeadId() {
  try {
    const counter = await Counter.findByIdAndUpdate(
      COUNTER_ID,
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    return formatLeadId(counter.seq);
  } catch {
    return "";
  }
}
