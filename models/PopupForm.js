import mongoose from "mongoose";

const PopupFormSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    lookingFor: { type: String, required: true },
    city: { type: String, required: true },
    formType: { type: String, required: true }  // NEW FIELD
  },
  { timestamps: true }
);

export default mongoose.models.PopupForm ||
  mongoose.model("PopupForm", PopupFormSchema);
