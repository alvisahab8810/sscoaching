import mongoose from "mongoose";

/**
 * A named running number. Used for the readable lead id, where counting the
 * collection on every submission would both get slower as the collection
 * grows and hand two simultaneous submissions the same number.
 */
const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

export default mongoose.models.Counter || mongoose.model("Counter", CounterSchema);
