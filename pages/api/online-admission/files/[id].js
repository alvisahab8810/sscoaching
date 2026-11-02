// Streams an uploaded admission document to its owner or to staff only.
import fs from "fs";
import Document from "@/models/onlineAdmission/Document";
import Application from "@/models/onlineAdmission/Application";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { route, fail, getApplicant, filePath } from "@/lib/onlineAdmission/server";

export default route({
  async GET(req, res) {
    const id = String(req.query.id || "");
    const doc = /^[a-f\d]{24}$/i.test(id) ? await Document.findById(id).lean() : null;
    if (!doc) throw fail(404, "File not found");

    let allowed = !!requireAdminApi(req, "admissions");
    if (!allowed) {
      const applicant = await getApplicant(req);
      const app = applicant && (await Application.findById(doc.application).select("applicant").lean());
      allowed = !!app && String(app.applicant) === String(applicant._id);
    }
    if (!allowed) throw fail(404, "File not found");

    const p = filePath(doc.stored_name);
    if (!fs.existsSync(p)) throw fail(404, "File is missing on the server");
    res.setHeader("Content-Type", doc.mime || "application/octet-stream");
    res.setHeader("Content-Disposition", `inline; filename="${String(doc.original_name || "document").replace(/[^\w.\- ]/g, "_")}"`);
    res.setHeader("Cache-Control", "private, max-age=3600");
    res.setHeader("X-Content-Type-Options", "nosniff");
    await new Promise((resolve, reject) => {
      fs.createReadStream(p).on("error", reject).on("end", resolve).pipe(res);
    });
  },
});
