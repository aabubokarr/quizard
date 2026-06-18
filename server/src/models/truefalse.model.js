import mongoose from "mongoose";

const trueFalseSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: Boolean,
      required: true,
    },
  },
  { timestamp: true }
);

const TrueFalse = mongoose.model("TrueFalse", trueFalseSchema);

export default TrueFalse;
