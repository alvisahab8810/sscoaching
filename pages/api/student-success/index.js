// import dbConnect from "@/lib/dbConnect";
// import StudentSuccess from "@/models/home/StudentSuccess";

// export default async function handler(req, res) {
//   await dbConnect();

//   // ✅ GET ALL
//   if (req.method === "GET") {
//     try {
//       const students = await StudentSuccess.find({ isActive: true })
//         .sort({ createdAt: -1 });

//       return res.status(200).json({
//         success: true,
//         data: students,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }

//   // ✅ CREATE
//   if (req.method === "POST") {
//     try {
//       const student = await StudentSuccess.create(req.body);

//       return res.status(201).json({
//         success: true,
//         data: student,
//       });
//     } catch (error) {
//       return res.status(400).json({
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

export default async function handler(req, res) {
  try {
    await dbConnect();

    if (req.method === "GET") {
      const page = Math.max(parseInt(req.query.page || "1"), 1);
      const limit = 10; // 🔥 permanent safe limit
      const skip = (page - 1) * limit;

      const [students, total] = await Promise.all([
        StudentSuccess.find(
          { isActive: true },
          {
            name: 1,
            rollNo: 1,
            className: 1,
            year: 1,
            score: 1,
            image: 1,
            bgColor: 1,
            createdAt: 1,
          }
        )
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),

        StudentSuccess.countDocuments({ isActive: true }),
      ]);

      return res.status(200).json({
        success: true,
        page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        data: students,
      });
    }

    if (req.method === "POST") {
      const student = await StudentSuccess.create(req.body);
      return res.status(201).json({ success: true, data: student });
    }

    return res.status(405).json({ success: false, message: "Method not allowed" });
  } catch (error) {
    console.error("StudentSuccess API Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
