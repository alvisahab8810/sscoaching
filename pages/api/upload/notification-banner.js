import path from "path";
import fs from "fs";
import { IncomingForm } from "formidable";
import jwt from "jsonwebtoken";

export const config = { api: { bodyParser: false } };

const MAX_SIZE = 1 * 1024 * 1024; // 1 MB
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"];

function verifyAdmin(req) {
  try {
    const token = req.cookies?.admin_token || req.cookies?.subadmin_token;
    if (!token) return false;
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch { return false; }
}

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ success: false, message: "Method not allowed" });

  if (!verifyAdmin(req))
    return res.status(401).json({ success: false, message: "Unauthorized" });

  const uploadDir = path.join(process.cwd(), "public/uploads/notifications");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    multiples: false,
    maxFileSize: MAX_SIZE,
    filter: ({ mimetype }) => ALLOWED_MIME.includes(mimetype),
  });

  try {
    const { files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const file = files.image?.[0];
    if (!file) return res.status(400).json({ success: false, message: "No file received. Only JPG, PNG or WebP images are accepted." });

    const mime = file.mimetype || "";
    if (!ALLOWED_MIME.includes(mime)) {
      fs.unlinkSync(file.filepath);
      return res.status(400).json({ success: false, message: "Sirf JPG, PNG ya WebP format allowed hai." });
    }

    if (file.size > MAX_SIZE) {
      fs.unlinkSync(file.filepath);
      return res.status(400).json({ success: false, message: "Image 1MB se choti honi chahiye." });
    }

    const url = `/uploads/notifications/${path.basename(file.filepath)}`;
    return res.status(200).json({ success: true, url });
  } catch (err) {
    if (err.code === 1009 || err.message?.includes("maxFileSize")) {
      return res.status(400).json({ success: false, message: "Image 1MB se choti honi chahiye." });
    }
    console.error("notification-banner upload error:", err);
    return res.status(500).json({ success: false, message: "Upload failed" });
  }
}
