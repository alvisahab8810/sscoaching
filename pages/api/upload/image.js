import path from "path";
import fs from "fs";
import { IncomingForm } from "formidable";
import jwt from "jsonwebtoken";

export const config = { api: { bodyParser: false } };

const PDF_EXTS  = [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xlsx", ".xls"];
const IMG_EXTS  = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];

function verifyAdmin(req) {
  try {
    const adminToken = req.cookies?.admin_token || req.cookies?.subadmin_token;
    if (!adminToken) return false;
    jwt.verify(adminToken, process.env.JWT_SECRET);
    return true;
  } catch { return false; }
}

function parseForm(req, uploadDir) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
      multiples: false,
      maxFileSize: 25 * 1024 * 1024,
    });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success: false, message: "Method not allowed" });
  if (!verifyAdmin(req)) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    // Determine upload destination from field name hint
    // "image" field → public (images shown in UI)
    // "file"  field → private_uploads (PDFs/docs, served via auth proxy)
    const fieldHint = req.headers["x-upload-type"] || "image";
    const isDoc = fieldHint === "file";

    const uploadDir = isDoc
      ? path.join(process.cwd(), "private_uploads")     // outside public — not directly accessible
      : path.join(process.cwd(), "public/uploads/courses");

    const { files } = await parseForm(req, uploadDir);
    const file = files.image?.[0] || files.file?.[0];
    if (!file) return res.status(400).json({ success: false, message: "No file provided" });

    const ext  = path.extname(file.originalFilename || file.filepath).toLowerCase();
    const isDocExt = PDF_EXTS.includes(ext);

    // If it's a document, ensure it's in private_uploads regardless of field name
    if (isDocExt && !isDoc) {
      // Move from public to private
      const privDir  = path.join(process.cwd(), "private_uploads");
      if (!fs.existsSync(privDir)) fs.mkdirSync(privDir, { recursive: true });
      const newPath  = path.join(privDir, path.basename(file.filepath));
      fs.renameSync(file.filepath, newPath);
      const url = `/private_uploads/${path.basename(newPath)}`;
      return res.status(200).json({ success: true, url, private: true });
    }

    const prefix = isDoc ? "/private_uploads" : "/uploads/courses";
    const url = `${prefix}/${path.basename(file.filepath)}`;
    return res.status(200).json({ success: true, url, private: isDoc });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message || "Upload failed" });
  }
}
