import mongoose from "mongoose";

const mcqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options:{
        type: [String],
        required: true,
        validate: [val => val.length = 4]
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Mcq = mongoose.model("Mcq", mcqSchema);

export default Mcq;
