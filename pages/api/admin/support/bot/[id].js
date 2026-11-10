import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import SupportBotNode from "@/models/SupportBotNode";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { cleanNode } from "@/lib/support";

/**
 * One bot entry. Super admin only.
 *
 * PUT    { title, answer, keywords, linkLabel, linkUrl, order, active }
 * DELETE removes the entry and everything under it
 */
export default async function handler(req, res) {
  const admin = requireAdminApi(req);
  if (admin?.role !== "super") return res.status(403).json({ success: false, message: "Super admin only" });
  await dbConnect();

  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) return res.status(404).json({ success: false, message: "Not found" });

  if (req.method === "PUT") {
    const data = cleanNode(req.body);
    if (data.title !== undefined && !data.title) return res.status(400).json({ success: false, message: "Question is required" });
    const node = await SupportBotNode.findByIdAndUpdate(id, { $set: data }, { new: true }).lean();
    if (!node) return res.status(404).json({ success: false, message: "Not found" });
    return res.status(200).json({ success: true, node: { ...node, _id: String(node._id), parent: node.parent ? String(node.parent) : null } });
  }

  if (req.method === "DELETE") {
    const ids = [new mongoose.Types.ObjectId(id)];
    let level = ids;
    while (level.length) {
      const kids = await SupportBotNode.find({ parent: { $in: level } }).select("_id").lean();
      level = kids.map((k) => k._id);
      ids.push(...level);
    }
    const r = await SupportBotNode.deleteMany({ _id: { $in: ids } });
    return res.status(200).json({ success: true, deleted: r.deletedCount });
  }

  return res.status(405).end();
}
