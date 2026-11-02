// All admission files as CSV (opens in Excel thanks to the UTF-8 BOM).
import Application from "@/models/onlineAdmission/Application";
import { route, requireStaff } from "@/lib/onlineAdmission/server";

const COLS = ["ref_no", "class", "stream", "block", "status", "name", "mobile", "pincode", "district", "state", "centre", "nios_ref", "enrollment_no", "price"];
// A leading = + - @ would make Excel run the cell as a formula.
const cell = (v) => {
  let s = String(v ?? "");
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
};

export default route({
  async GET(req, res) {
    requireStaff(req);
    const apps = await Application.find({}).sort({ seq: 1 }).populate("applicant", "mobile").lean();
    const rows = apps.map((a) => {
      const ad = a.form?.address || {};
      return {
        ref_no: a.ref_no, class: a.class, stream: a.stream, block: a.block || "", status: a.status,
        name: a.form?.full_name || "", mobile: a.applicant?.mobile || "", pincode: ad.pincode || "",
        district: ad.district || "", state: ad.state || "", centre: a.centre_code || "", nios_ref: a.nios_ref || "",
        enrollment_no: a.enrollment_no || "", price: a.price,
      };
    });
    const csv = "﻿" + [COLS.join(","), ...rows.map((r) => COLS.map((c) => cell(r[c])).join(","))].join("\r\n");
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="nios-admissions-${new Date().toISOString().slice(0, 10)}.csv"`);
    res.status(200).send(csv);
  },
});
