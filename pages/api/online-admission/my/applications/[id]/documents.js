// Student uploads one document (multipart: type + file).
import { docSlots, EDITABLE } from "@/lib/onlineAdmission/config";
import Document from "@/models/onlineAdmission/Document";
import {
  route, fail, ownApplication, parseMultipart, storeFile, studentView, addEvent, studentActor,
} from "@/lib/onlineAdmission/server";

export const config = { api: { bodyParser: false } };

export default route({
  async POST(req) {
    const { applicant, app } = await ownApplication(req);
    const { fields, file } = await parseMultipart(req);
    const slot = docSlots(app.toObject()).find((s) => s.type === fields.type);
    if (!slot) throw fail(400, "Unknown document type");
    // Under verification only a rejected document can be replaced
    const replacing = app.status === "submitted"
      && await Document.exists({ application: app._id, type: slot.type, current: true, status: "rejected" });
    if (!EDITABLE.includes(app.status) && !replacing) throw fail(409, "Documents are locked while being processed");
    if (!file) throw fail(400, "Choose a file");
    await storeFile(app, file, slot.type, { accept: slot.accept });
    app.updated_at = new Date();
    await app.save();
    if (replacing) await addEvent(app, studentActor(applicant), "doc_reuploaded", `${slot.label} uploaded again for verification`);
    return studentView(app);
  },
});
