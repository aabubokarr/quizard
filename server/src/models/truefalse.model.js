import mongoose from "mongoose";

const truefalseSchema = mongoose.Schema(
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

const TrueFalse = mongoose.model("TrueFalse", truefalseSchema);

export default TrueFalse;
