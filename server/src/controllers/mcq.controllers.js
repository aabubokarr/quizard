import Mcq from "../models/mcq.model.js";

export const getMcq = async (_, res) => {
  try {
    const mcq = await Mcq.find();
    res.status(200).json(mcq);
  } catch (error) {
    console.log("Error Fetching Mcq's", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createMcq = async (req, res) => {
  try {
    const { question, options, answer } = req.body;
    const mcq = new Mcq({
      question,
      options,
      answer,
    });

    const saveMcq = await mcq.save();
    res.status(201).json(saveMcq);
  } catch (error) {
    console.log("Error Creating Mcq", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateMcq = async (req, res) => {
  try {
    const { question, options, answer } = req.body;
    const mcq = await Mcq.findByIdAndUpdate(
      req.params.id,
      {
        question,
        options,
        answer,
      },
      { new: true }
    );

    if (!mcq) return res.status(404).json({ message: "Mcq Not Found" });

    res.status(200).json(mcq);
  } catch (error) {
    console.log("Error Updating Mcq", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMcq = async (req, res) => {
  try {
    const mcq = await Mcq.findByIdAndDelete(req.params.id);

    if (!mcq) return res.status(404).json({ message: "Mcq Not Found" });

    res.status(200).json({ message: "Mcq Deleted Successfully" });
  } catch (error) {
    console.log("Error Deleting Mcq", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
