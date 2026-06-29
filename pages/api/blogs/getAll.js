// import dbConnect from "@/lib/dbConnect";
// import Blog from "@/models/Blog";

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method !== "GET") {
//     return res.status(405).json({ success: false, message: "Method not allowed" });
//   }

//   try {
//     // Query params
//     const {
//       page = 1,
//       limit = 10,
//       search = "",
//       category = "",
//       author = "",
//       status = "", // e.g. 'published' | 'draft'
//       sortBy = "createdAt",
//       sortOrder = "desc", // or 'asc'
//     } = req.query;

//     const filter = {};

//     // Search by title or content
//     if (search) {
//       filter.$or = [
//         { title: { $regex: search, $options: "i" } },
//         { content: { $regex: search, $options: "i" } },
//       ];
//     }

//     // Filter by category
//     if (category) filter.category = category;

//     // Filter by author
//     if (author) filter.author = author;

//     // Filter by status
//     if (status) filter.status = status;

//     // Pagination
//     const skip = (parseInt(page) - 1) * parseInt(limit);

//     // Sort
//     const sortOptions = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

//     // Query DB
//     const blogs = await Blog.find(filter)
//       .sort(sortOptions)
//       .skip(skip)
//       .limit(parseInt(limit));

//     const total = await Blog.countDocuments(filter);
//     const totalPages = Math.ceil(total / limit);

//     return res.status(200).json({
//       success: true,
//       data: blogs,
//       pagination: {
//         total,
//         page: parseInt(page),
//         totalPages,
//         limit: parseInt(limit),
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error fetching blogs",
//       error: error.message,
//     });
//   }
// }













// pages/api/blogs/getAll.js
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export default async function handler(req, res) {
  try {
    await dbConnect();
  } catch (err) {
    console.error("DB connect failed:", err.message);
    return res.status(500).json({ success: false, message: "Database connection failed. Please try again." });
  }

  const {
    id,
    search   = "",
    category = "",
    status   = "",
    author   = "",
    page     = "1",
    limit    = "10",
  } = req.query;

  const pageNum  = Math.max(1, parseInt(page)  || 1);
  const limitNum = Math.max(1, parseInt(limit) || 10);

  try {
    if (id) {
      const blog = await Blog.findById(id);
      if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
      return res.status(200).json({ success: true, blog });
    }

    const filter = {};
    if (search)   filter.title      = { $regex: search, $options: "i" };
    if (category) filter.category   = category;
    if (status)   filter.status     = status;
    if (author)   filter.authorName = author;

    const total = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .select('-content') // content mein base64 images hain — list view mein nahi chahiye
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ publishDate: -1 });

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: { total, page: pageNum, totalPages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    console.error("getAll blogs error:", error.message);
    res.status(500).json({ success: false, message: "Server Error", detail: error.message });
  }
}
