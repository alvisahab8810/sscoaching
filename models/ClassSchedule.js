import mongoose from "mongoose";

/**
 * Weekly class timetable of a Pro batch (bundle course).
 *
 * Only students with an active enrollment in the course see it, on the
 * website dashboard and in the app. Times are IST, "HH:MM" in 24-hour form.
 * days uses JavaScript's numbering: 0 = Sunday ... 6 = Saturday.
 */
const SlotSchema = new mongoose.Schema({
  start:   { type: String, required: true },
  end:     { type: String, required: true },
  // Blank only for a doubt session open to every subject.
  subject: { type: String, default: "", trim: true },
  type:    { type: String, enum: ["class", "doubt"], default: "class" },
  // Own days for this slot (a Saturday doubt session); empty = schedule's days.
  days:    { type: [Number], default: [] },
}, { _id: false });

const ClassScheduleSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, unique: true },
  active: { type: Boolean, default: true },
  days:   { type: [Number], default: [] },
  slots:  { type: [SlotSchema], default: [] },
  note:   { type: String, default: "", trim: true },
}, { timestamps: true });

export default mongoose.models.ClassSchedule || mongoose.model("ClassSchedule", ClassScheduleSchema);
