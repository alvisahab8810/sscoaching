import dbConnect from "@/lib/dbConnect";
import LiveClass from "@/models/LiveClassModel";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  /* ============================================================
     GET  /api/onlineClasses/:id
     Get a single live class by ID
  ============================================================ */
  if (req.method === "GET") {
    try {
      const liveClass = await LiveClass.findById(id);

      if (!liveClass) {
        return res.status(404).json({
          success: false,
          message: "Live class not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: liveClass,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Server error",
      });
    }
  }

  /* ============================================================
     PUT  /api/onlineClasses/:id
     Update a live class by ID
  ============================================================ */
  if (req.method === "PUT") {
    try {
      const {
        title,
        teacher,
        subject,
        chapter,
        topic,
        batch,
        date,
        time,
        duration,
        streamLink,
        description,
        status,
      } = req.body;

      if (!title || !teacher || !subject || !batch || !date || !time || !streamLink) {
        return res.status(400).json({
          success: false,
          message: "Please fill all required fields",
        });
      }

      const updated = await LiveClass.findByIdAndUpdate(
        id,
        {
          title,
          teacher,
          subject,
          chapter,
          topic,
          batch,
          date,
          time,
          duration,
          streamLink,
          description,
          status,
        },
        { new: true, runValidators: true }
      );

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Live class not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Live class updated successfully",
        data: updated,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Server error",
      });
    }
  }

  /* ============================================================
     DELETE  /api/onlineClasses/:id
     Delete a live class by ID
  ============================================================ */
  if (req.method === "DELETE") {
    try {
      const deleted = await LiveClass.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Live class not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Live class deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Server error",
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: "Method not allowed",
  });
}