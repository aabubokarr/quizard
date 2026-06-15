import mongoose from "mongoose";

const blankSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const Blank = mongoose.model("Blank", blankSchema);

export default Blank;
