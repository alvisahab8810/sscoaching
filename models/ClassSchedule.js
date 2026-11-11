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
  subject: { type: String, required: true, trim: true },
}, { _id: false });

const ClassScheduleSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, unique: true },
  active: { type: Boolean, default: true },
  days:   { type: [Number], default: [] },
  slots:  { type: [SlotSchema], default: [] },
  note:   { type: String, default: "", trim: true },
}, { timestamps: true });

export default mongoose.models.ClassSchedule || mongoose.model("ClassSchedule", ClassScheduleSchema);
