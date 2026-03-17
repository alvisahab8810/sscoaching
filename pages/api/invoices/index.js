// pages/api/invoices/index.js
// Admin: list all invoices with filters + pagination

import dbConnect from "@/lib/dbConnect";
import Invoice from "@/models/Invoice";
import { withAdminAuth } from "@/lib/withAdminAuth";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const {
        page     = 1,
        limit    = 20,
        status,
        search,
        from,
        to,
      } = req.query;

      const query = {};

      // Filter by status
      if (status && status !== "all") query.status = status;

      // Filter by date range
      if (from || to) {
        query.issuedAt = {};
        if (from) query.issuedAt.$gte = new Date(from);
        if (to)   query.issuedAt.$lte = new Date(new Date(to).setHours(23, 59, 59));
      }

      // Search by invoice number, student name, course title
      if (search) {
        query.$or = [
          { invoiceNumber: { $regex: search, $options: "i" } },
          { studentName:   { $regex: search, $options: "i" } },
          { courseTitle:   { $regex: search, $options: "i" } },
          { paymentId:     { $regex: search, $options: "i" } },
          { studentPhone:  { $regex: search, $options: "i" } },
        ];
      }

      const skip  = (Number(page) - 1) * Number(limit);
      const total = await Invoice.countDocuments(query);

      const invoices = await Invoice.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean();

      // Summary stats
      const stats = await Invoice.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue:  { $sum: "$total" },
            totalInvoices: { $sum: 1 },
            paidCount:     { $sum: { $cond: [{ $eq: ["$status", "paid"] },      1, 0] } },
            refundedCount: { $sum: { $cond: [{ $eq: ["$status", "refunded"] },  1, 0] } },
          },
        },
      ]);

      return res.status(200).json({
        success: true,
        invoices,
        pagination: {
          total,
          page:       Number(page),
          limit:      Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
        stats: stats[0] || { totalRevenue: 0, totalInvoices: 0, paidCount: 0, refundedCount: 0 },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch invoices" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}