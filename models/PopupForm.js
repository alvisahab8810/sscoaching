// import mongoose from "mongoose";

// const PopupFormSchema = new mongoose.Schema(
//   {
//     fullName: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     lookingFor: { type: String, required: true },
//     city: { type: String, required: true },
//     formType: { type: String, required: true }  // NEW FIELD
//   },
//   { timestamps: true }
// );

// export default mongoose.models.PopupForm ||
//   mongoose.model("PopupForm", PopupFormSchema);



import mongoose from "mongoose";

const PopupFormSchema = new mongoose.Schema(
  {
    fullName:   { type: String, required: true },
    email:      { type: String, required: true},   // hidden in form for now
    phone:      { type: String, required: true },
    lookingFor: { type: String, required: false, default: "" },   // hidden in form for now
    city:       { type: String, required: false, default: "" },   // hidden in form for now
    formType:   { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.PopupForm ||
  mongoose.model("PopupForm", PopupFormSchema);