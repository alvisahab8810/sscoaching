import mongoose from "mongoose";

/**
 * The lead rotation: a single document that remembers whose turn it is and
 * how many leads that person has had in the current batch.
 *
 * "version" is bumped on every write so two leads arriving together cannot
 * both read the same turn and both be counted against it.
 */
const SalesAssignStateSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "main" },
    enabled: { type: Boolean, default: true },
    batchSize: { type: Number, default: 10, min: 1, max: 500 },
    currentId: { type: mongoose.Schema.Types.ObjectId, ref: "SubAdmin", default: null },
    countInBatch: { type: Number, default: 0 },
    version: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.SalesAssignState ||
  mongoose.model("SalesAssignState", SalesAssignStateSchema);
