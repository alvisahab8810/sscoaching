import dbConnect from "@/lib/dbConnect";
import LiveClass from "@/models/LiveClassModel";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  await dbConnect();

  try {
    const { status, batch, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (batch) filter.batch = { $regex: `^${batch}$`, $options: "i" };

    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      LiveClass.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      LiveClass.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data,
      pagination: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message || "Server error" });
  }
}
