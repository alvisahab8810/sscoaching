import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  driveLink: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["notes", "assignment", "solution", "other"],
    default: "notes",
  },
});

const LiveClassSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Class title is required"],
      trim: true,
    },

    teacher: {
      type: String,
      required: [true, "Teacher name is required"],
      trim: true,
    },

    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },

    chapter: {
      type: String,
      trim: true,
      default: "",
    },

    topic: {
      type: String,
      trim: true,
      default: "",
    },

    batch: {
      type: String,
      required: [true, "Batch is required"],
      trim: true,
    },

    date: {
      type: String,
      required: [true, "Date is required"],
    },

    time: {
      type: String,
      required: [true, "Time is required"],
    },

    duration: {
      type: String,
      default: "",
    },

    streamLink: {
      type: String,
      required: [true, "Stream link is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["upcoming", "live", "completed"],
      default: "upcoming",
    },

    notes: {
      type: [NoteSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.LiveClass ||
  mongoose.model("LiveClass", LiveClassSchema);



// import mongoose from "mongoose";

// const LiveClassSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Class title is required"],
//       trim: true,
//     },

//     teacher: {
//       type: String,
//       required: [true, "Teacher name is required"],
//       trim: true,
//     },

//     subject: {
//       type: String,
//       required: [true, "Subject is required"],
//       trim: true,
//     },

//     chapter: {
//       type: String,
//       trim: true,
//       default: "",
//     },

//     topic: {
//       type: String,
//       trim: true,
//       default: "",
//     },

//     batch: {
//       type: String,
//       required: [true, "Batch is required"],
//       trim: true,
//     },

//     date: {
//       type: String,
//       required: [true, "Date is required"],
//     },

//     time: {
//       type: String,
//       required: [true, "Time is required"],
//     },

//     duration: {
//       type: String,
//       default: "",
//     },

//     streamLink: {
//       type: String,
//       required: [true, "Stream link is required"],
//       trim: true,
//     },

//     description: {
//       type: String,
//       trim: true,
//       default: "",
//     },

//     status: {
//       type: String,
//       enum: ["upcoming", "live", "completed"],
//       default: "upcoming",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.models.LiveClass ||
//   mongoose.model("LiveClass", LiveClassSchema);