import path from "path";
import fs from "fs";
import { IncomingForm } from "formidable";
import jwt from "jsonwebtoken";

export const config = { api: { bodyParser: false } };

const MAX_SIZE = 400 * 1024; // 400 KB

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

  const uploadDir = path.join(process.cwd(), "public/uploads/blogs");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    multiples: false,
    maxFileSize: MAX_SIZE,
    filter: ({ mimetype }) => mimetype === "image/webp",
  });

  try {
    const { files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const file = files.image?.[0];
    if (!file) return res.status(400).json({ success: false, message: "No file received. Only WebP images are accepted." });

    // Double-check MIME type (formidable filter might not block all cases)
    const mime = file.mimetype || "";
    if (mime !== "image/webp") {
      fs.unlinkSync(file.filepath);
      return res.status(400).json({ success: false, message: "Sirf WebP format allowed hai." });
    }

    // Double-check size
    if (file.size > MAX_SIZE) {
      fs.unlinkSync(file.filepath);
      return res.status(400).json({ success: false, message: "Image 400KB se choti honi chahiye." });
    }

    const url = `/uploads/blogs/${path.basename(file.filepath)}`;
    return res.status(200).json({ success: true, url });
  } catch (err) {
    // formidable throws if file too large
    if (err.code === 1009 || err.message?.includes("maxFileSize")) {
      return res.status(400).json({ success: false, message: "Image 400KB se choti honi chahiye." });
    }
    console.error("blog-image upload error:", err);
    return res.status(500).json({ success: false, message: "Upload failed" });
  }
}
