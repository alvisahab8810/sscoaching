import dbConnect from "@/lib/dbConnect";
import PopupForm from "@/models/PopupForm";
import { resolveLeadSource } from "@/lib/leadSource";
import { nextLeadId } from "@/lib/leadId";
import { autoAssignLead } from "@/lib/salesAssign";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    await dbConnect();

    // The forms post a raw JSON string, so the body may arrive either parsed
    // or not depending on the caller.
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const attr = body.attribution || {};

    // Only the known fields are stored; anything else the client sends is
    // ignored so a crafted request cannot set arbitrary document fields.
    const saved = await PopupForm.create({
      fullName: body.fullName,
      email: body.email || "",
      phone: body.phone,
      lookingFor: body.lookingFor || "",
      city: body.city || "",
      formType: body.formType,
      leadId: await nextLeadId(),
      source: resolveLeadSource(attr),
      utmSource: attr.utmSource || "",
      utmMedium: attr.utmMedium || "",
      utmCampaign: attr.utmCampaign || "",
      gclid: attr.gclid || "",
      fbclid: attr.fbclid || "",
      referrer: attr.referrer || "",
      landingPage: attr.landingPage || "",
    });

    // Hand the lead to whoever's turn it is in the sales rotation.
    await autoAssignLead(saved._id);

    return res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: saved,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
