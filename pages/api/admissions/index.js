// /pages/api/admissions/index.js
import dbConnect from "@/lib/dbConnect";
import Admission from "@/models/Admission";
import formidable from "formidable";
import path from "path";
import fs from "fs";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const admissions = await Admission.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: admissions });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  if (req.method === "POST") {
    const uploadDir = path.join(process.cwd(), "public/uploads/admissions");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(400).json({ success: false, message: "File upload error" });

      const get = (f) => (Array.isArray(fields[f]) ? fields[f][0] : fields[f]);

      const photoFile = files.photo?.[0] || files.photo;
      const docsFile  = files.documents?.[0] || files.documents;

      const photoPath = photoFile
        ? "/uploads/admissions/" + path.basename(photoFile.filepath)
        : "";
      const docsPath  = docsFile
        ? "/uploads/admissions/" + path.basename(docsFile.filepath)
        : "";

      try {
        const admission = await Admission.create({
          studentName:          get("studentName"),
          fatherName:           get("fatherName"),
          motherName:           get("motherName"),
          gender:               get("gender"),
          dob:                  get("dob"),
          email:                get("email"),
          mobile:               get("mobile"),
          phone:                get("phone"),
          nationality:          get("nationality"),
          category:             get("category"),
          employmentStatus:     get("employmentStatus"),
          courseApplying:       get("courseApplying"),
          toc:                  get("toc"),
          correspondingAddress: get("correspondingAddress"),
          permanentAddress:     get("permanentAddress"),
          pinCode:              get("pinCode"),
          district:             get("district"),
          state:                get("state"),
          photo:                photoPath,
          documents:            docsPath,
        });
        return res.status(201).json({ success: true, data: admission });
      } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
      }
    });
    return;
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}