import dbConnect from "@/lib/dbConnect";
import LiveClass from "@/models/LiveClassModel";
import jwt from "jsonwebtoken";

function verifyAdmin(req) {
  try {
    const token = req.cookies?.admin_token;
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  await dbConnect();

  const admin = verifyAdmin(req);
  if (!admin) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const { id } = req.query; // class ID

  /* ============================================================
     POST /api/admin/notes?id=classId
     Add a note to a class
  ============================================================ */
  if (req.method === "POST") {
    try {
      const { title, driveLink, type } = req.body;

      if (!title || !driveLink) {
        return res.status(400).json({
          success: false,
          message: "Title and Drive link are required",
        });
      }

      // Convert Google Drive share link to direct view link
      const viewLink = convertDriveLink(driveLink);

      const liveClass = await LiveClass.findByIdAndUpdate(
        id,
        {
          $push: {
            notes: { title, driveLink: viewLink, type: type || "notes" },
          },
        },
        { new: true }
      );

      if (!liveClass) {
        return res.status(404).json({ success: false, message: "Class not found" });
      }

      return res.status(200).json({
        success: true,
        message: "Note added successfully",
        notes: liveClass.notes,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  /* ============================================================
     DELETE /api/admin/notes?id=classId&noteId=noteId
     Remove a note from a class
  ============================================================ */
  if (req.method === "DELETE") {
    try {
      const { noteId } = req.query;

      const liveClass = await LiveClass.findByIdAndUpdate(
        id,
        { $pull: { notes: { _id: noteId } } },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Note deleted",
        notes: liveClass.notes,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}

/* ============================================================
   Convert Google Drive share link to direct view/download link
   Input:  https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   Output: https://drive.google.com/file/d/FILE_ID/view
============================================================ */
function convertDriveLink(url) {
  try {
    // Extract file ID from various Google Drive URL formats
    const patterns = [
      /drive\.google\.com\/file\/d\/([^/]+)/,
      /drive\.google\.com\/open\?id=([^&]+)/,
      /docs\.google\.com\/.*\/d\/([^/]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        const fileId = match[1];
        return `https://drive.google.com/file/d/${fileId}/view`;
      }
    }

    // If no pattern matches, return original URL
    return url;
  } catch {
    return url;
  }
}