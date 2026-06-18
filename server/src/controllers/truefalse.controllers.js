import TrueFalse from "../models/truefalse.model.js";

export const getTrueFalse = async (_, res) => {
  try {
    const trueFalse = await TrueFalse.find();
    res.status(200).json({ trueFalse });
  } catch (error) {
    console.log("Error Fetching True False's", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createTrueFalse = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const trueFalse = new TrueFalse({ question, answer });

    const saveTrueFalse = await trueFalse.save();
    res.status(201).json(saveTrueFalse);
  } catch (error) {
    console.log("Error Creating True False", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTrueFalse = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const trueFalse = await TrueFalse.findByIdAndUpdate(
      req.params.id,
      {
        question,
        answer,
      },
      { new: true }
    );

    if (!trueFalse)
      return res.status(404).json({ message: "True False Not Found" });

    res.status(200).json(trueFalse);
  } catch (error) {
    console.log("Error Updating True False", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTrueFalse = async (req, res) => {
  try {
    const trueFalse = await TrueFalse.findByIdAndDelete(req.params.id);

    if (!trueFalse)
      return res.status(404).json({ message: "True False Not Found" });

    res.status(200).json({ message: "True False Deleted Successfully" });
  } catch (error) {
    console.log("Error Deleting True False", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
