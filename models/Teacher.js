import mongoose from "mongoose";

/**
 * A teacher account.
 *
 * Teachers are invited by a super admin and get their own portal at
 * /dashboard/teacher, where the only thing they can reach is online
 * classes. They are deliberately kept separate from SubAdmin so that
 * staff permissions and teaching records never mix.
 *
 * Like SubAdmin, the plain password is kept alongside the hash so the
 * admin can re-send credentials from the dashboard. Login itself always
 * checks the hash.
 */
const TeacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    passwordHash: { type: String, required: true },

    phone: { type: String, default: "", trim: true },

    // Subjects this teacher handles -- shown on the admin report and used
    // to pre-fill the subject field when they schedule a class.
    subjects: { type: [String], default: [] },

    qualification: { type: String, default: "", trim: true },

    status: { type: String, enum: ["active", "inactive"], default: "active" },

    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Teacher || mongoose.model("Teacher", TeacherSchema);
