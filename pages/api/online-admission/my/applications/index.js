// The logged-in student's admission files: list them, or start one.
import Counter from "@/models/Counter";
import Application from "@/models/onlineAdmission/Application";
import { currentBlock } from "@/lib/onlineAdmission/config";
import {
  route, fail, requireApplicant, getSettings, addEvent, studentActor, studentView,
} from "@/lib/onlineAdmission/server";

export default route({
  async GET(req) {
    const applicant = await requireApplicant(req);
    const apps = await Application.find({ applicant: applicant._id }).sort({ seq: -1 });
    return { applications: await Promise.all(apps.map(studentView)) };
  },

  async POST(req) {
    const applicant = await requireApplicant(req);
    const settings = await getSettings();
    if (settings.launch_mode !== "live") throw fail(409, "Admissions open soon. Register your interest and we will call you");

    const cls = String(req.body?.class || "");
    if (!["10", "12"].includes(cls)) throw fail(400, "Choose Class 10th or 12th");
    const stream = String(req.body?.stream || "1") === "2" ? "2" : "1";

    const dup = await Application.findOne({ applicant: applicant._id, class: cls, status: { $ne: "cancelled" } }).select("_id");
    if (dup) return { id: String(dup._id), existing: true };

    const { seq } = await Counter.findOneAndUpdate(
      { _id: "online_admission" }, { $inc: { seq: 1 } }, { upsert: true, new: true }
    );
    const yy = String(new Date().getFullYear()).slice(-2);
    const ref_no = `SSN${yy}-${cls}-${String(seq).padStart(5, "0")}`;
    const app = await Application.create({
      seq, ref_no, applicant: applicant._id, class: cls, stream,
      block: stream === "1" ? (["1", "2"].includes(String(req.body?.block)) ? String(req.body.block) : currentBlock()) : null,
      status: "draft",
      price: +settings[`price_${cls}`],
      form: { mobile: applicant.mobile, full_name: applicant.name || "" },
    });
    await addEvent(app, studentActor(applicant), "created", `Application ${ref_no} started for Class ${cls}th`);
    return { id: String(app._id) };
  },
});
