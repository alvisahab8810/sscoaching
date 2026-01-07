// import dbConnect from "@/lib/dbConnect";
// import StudentSuccess from "@/models/home/StudentSuccess";

// export default async function handler(req, res) {
//   await dbConnect();

//   const { id } = req.query;

//   // ✅ UPDATE
//   if (req.method === "PUT") {
//     try {
//       const updated = await StudentSuccess.findByIdAndUpdate(
//         id,
//         req.body,
//         { new: true }
//       );

//       return res.status(200).json({
//         success: true,
//         data: updated,
//       });
//     } catch (error) {
//       return res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }

//   // ✅ DELETE
//   if (req.method === "DELETE") {
//     try {
//       await StudentSuccess.findByIdAndDelete(id);

//       return res.status(200).json({
//         success: true,
//         message: "Deleted successfully",
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }

//   res.status(405).json({
//     success: false,
//     message: "Method not allowed",
//   });
// }



import dbConnect from "@/lib/dbConnect";
import StudentSuccess from "@/models/home/StudentSuccess";
import { uploadStudentImage } from "@/lib/uploadStudentImage";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  /* ===================== PUT ===================== */
  if (req.method === "PUT") {
    uploadStudentImage.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }

      try {
        const updateData = {
          name: req.body.name,
          rollNo: req.body.rollNo,
          className: req.body.className,
          year: req.body.year,
          score: req.body.score,
          bgColor: req.body.bgColor,
        };

        if (req.file) {
          updateData.image = `/uploads/students/${req.file.filename}`;
        }

        const updated = await StudentSuccess.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        );

        return res.status(200).json({
          success: true,
          data: updated,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    });
    return;
  }

  /* ===================== DELETE ===================== */
  if (req.method === "DELETE") {
    try {
      await StudentSuccess.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        message: "Deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  res.status(405).json({ success: false, message: "Method not allowed" });
}
