import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import path from "path";

export const config = { api: { bodyParser: false } };

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files allowed"));
  },
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    await runMiddleware(req, res, upload.single("avatar"));

    if (!req.file)
      return res.status(400).json({ success: false, message: "No image provided" });

    // Save file to public/uploads/avatars/
    const ext = req.file.mimetype === "image/png" ? "png" : "jpg";
    const filename = `${id}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");
    fs.mkdirSync(uploadDir, { recursive: true });
    fs.writeFileSync(path.join(uploadDir, filename), req.file.buffer);

    const avatarUrl = `/uploads/avatars/${filename}`;

    await dbConnect();
    const student = await StudentUser.findByIdAndUpdate(id, { avatar: avatarUrl }, { new: true });

    return res.status(200).json({
      success: true,
      avatar: avatarUrl,
      user: {
        _id: student._id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        class: student.className,
        className: student.className,
        avatar: avatarUrl,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message || "Upload failed" });
  }
}
