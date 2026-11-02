import mongoose from "mongoose";

/**
 * NIOS study centres imported from the desk's Settings tab. While this
 * collection is empty the bundled list in data/online-admission/centres.json
 * is used instead (see lib/onlineAdmission/centres.js).
 */
const CentreSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: String,
  address: String,
  district: String,
  state: String,
  rc: String,
  pincode: String,
  mobile: String,
  phone: String,
  email: String,
  course: String,
  medium: String,
  science: String,
  balance: Number,
  lat: Number,
  lng: Number,
  geo_quality: String,
  type: String,
});

export default mongoose.models.OnlineAdmissionCentre ||
  mongoose.model("OnlineAdmissionCentre", CentreSchema, "online_admission_centres");
