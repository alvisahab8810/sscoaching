
// import dbConnect from "@/lib/dbConnect";
// import StudentSuccess from "@/models/home/StudentSuccess";

// export default async function handler(req, res) {
//   try {
//     await dbConnect();

//     if (req.method === "GET") {
//       const page = Math.max(parseInt(req.query.page || "1"), 1);
//       const limit = 10; // 🔥 permanent safe limit
//       const skip = (page - 1) * limit;

//       const [students, total] = await Promise.all([
//         StudentSuccess.find(
//           { isActive: true },
//           {
//             name: 1,
//             rollNo: 1,
//             className: 1,
//             year: 1,
//             score: 1,
//             image: 1,
//             bgColor: 1,
//             createdAt: 1,
//           }
//         )
//           .sort({ createdAt: -1 })
//           .skip(skip)
//           .limit(limit)
//           .lean(),

//         StudentSuccess.countDocuments({ isActive: true }),
//       ]);

//       return res.status(200).json({
//         success: true,
//         page,
//         totalPages: Math.ceil(total / limit),
//         totalRecords: total,
//         data: students,
//       });
//     }

//     if (req.method === "POST") {
//       const student = await StudentSuccess.create(req.body);
//       return res.status(201).json({ success: true, data: student });
//     }

//     return res.status(405).json({ success: false, message: "Method not allowed" });
//   } catch (error) {
//     console.error("StudentSuccess API Error:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// }



import dbConnect from "@/lib/dbConnect";
import StudentSuccess from "@/models/home/StudentSuccess";
import { uploadStudentImage } from "@/lib/uploadStudentImage";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  await dbConnect();

  /* ===================== GET ===================== */
  // if (req.method === "GET") {
  //   try {
  //     const page = Math.max(parseInt(req.query.page || "1"), 1);
  //     const limit = Math.min(parseInt(req.query.limit || "15"), 20);
  //     const skip = (page - 1) * limit;

  //     const [students, total] = await Promise.all([
  //       StudentSuccess.find(
  //         { isActive: true },
  //         {
  //           name: 1,
  //           rollNo: 1,
  //           className: 1,
  //           score: 1,
  //           image: 1,
  //           bgColor: 1,
  //         }
  //       )
  //         .sort({ createdAt: -1 })
  //         .skip(skip)
  //         .limit(limit)
  //         .lean(),

  //       StudentSuccess.countDocuments({ isActive: true }),
  //     ]);

  //     return res.status(200).json({
  //       success: true,
  //       data: students,
  //       pagination: {
  //         page,
  //         totalPages: Math.ceil(total / limit),
  //         totalRecords: total,
  //       },
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: error.message,
  //     });
  //   }
  // }


  if (req.method === "GET") {
  try {
    const year = req.query.year ? Number(req.query.year) : null;
    const page = Math.max(parseInt(req.query.page || "1"), 1);
    const limit = Math.min(parseInt(req.query.limit || "100"), 100);
    const skip = (page - 1) * limit;

    const filter = { isActive: true };
    if (year) filter.year = year;

    const [students, total] = await Promise.all([
      StudentSuccess.find(
        filter,
        {
          name: 1,
          rollNo: 1,
          className: 1,
          score: 1,
          image: 1,
          bgColor: 1,
          year: 1,
        }
      )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      StudentSuccess.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: students,
      pagination: {
        page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}


  /* ===================== POST ===================== */
  if (req.method === "POST") {
    uploadStudentImage.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      try {
        const student = await StudentSuccess.create({
          name: req.body.name,
          rollNo: req.body.rollNo,
          className: req.body.className,
          year: req.body.year,
          score: req.body.score,
          bgColor: req.body.bgColor || "#ffeed1",
          image: req.file
            ? `/uploads/students/${req.file.filename}`
            : "",
          isActive: true,
        });

        return res.status(201).json({
          success: true,
          data: student,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    });
    return;
  }

  res.status(405).json({ success: false, message: "Method not allowed" });
}
