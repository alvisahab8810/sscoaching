// Student uploads one document (multipart: type + file).
import { docSlots, EDITABLE } from "@/lib/onlineAdmission/config";
import { route, fail, ownApplication, parseMultipart, storeFile, studentView } from "@/lib/onlineAdmission/server";

export const config = { api: { bodyParser: false } };

export default route({
  async POST(req) {
    const { app } = await ownApplication(req);
    if (!EDITABLE.includes(app.status)) throw fail(409, "Documents are locked while being processed");
    const { fields, file } = await parseMultipart(req);
    const slot = docSlots(app.toObject()).find((s) => s.type === fields.type);
    if (!slot) throw fail(400, "Unknown document type");
    if (!file) throw fail(400, "Choose a file");
    await storeFile(app, file, slot.type, { accept: slot.accept });
    app.updated_at = new Date();
    await app.save();
    return studentView(app);
  },
});
