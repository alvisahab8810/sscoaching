// Student sends the completed form and documents for verification.
import { EDITABLE } from "@/lib/onlineAdmission/config";
import { validateForSubmit } from "@/lib/onlineAdmission/validate";
import {
  route, fail, ownApplication, currentDocs, plain, addEvent, studentActor, studentView,
} from "@/lib/onlineAdmission/server";
import { mailStaff, mailStudent } from "@/lib/onlineAdmission/mail";

export default route({
  async POST(req) {
    const { applicant, app } = await ownApplication(req);
    if (!EDITABLE.includes(app.status)) throw fail(409, "Already submitted");
    const { errors } = validateForSubmit(plain(app), await currentDocs(app));
    if (Object.keys(errors).length) throw fail(422, "Please complete the highlighted items", { errors });

    const again = app.status === "changes_requested";
    app.status = "submitted";
    app.submitted_at = new Date();
    app.review_note = null;
    await app.save();
    await addEvent(app, studentActor(applicant), "submitted",
      again ? "Corrections resubmitted for verification" : "Form and documents submitted for verification");
    await mailStudent(app, "submitted");
    await mailStaff(app, again ? "Corrections resubmitted, verify again" : "New application to verify");
    return studentView(app);
  },
});
