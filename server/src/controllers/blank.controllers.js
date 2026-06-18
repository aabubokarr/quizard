import Blank from "../models/blank.model.js";

export const getBlank = async (_, res) => {
  try {
    const blank = await Blank.find();
    res.status(200).json(blank);
  } catch (error) {
    console.log("Error Fetching Fill In The Blanks", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createBlank = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const blank = new Blank({ question, answer });

    res.status(201).json(blank);
  } catch (error) {
    console.log("Error Creating Fill In The Blank", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateBlank = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const blank = await Blank.findByIdAndUpdate(
      req.params.id,
      { question, answer },
      { new: true }
    );

    if (!blank)
      return res.status(404).json({ message: "Fill In The Blank Not Found" });

    res.status(200).json(blank);
  } catch (error) {
    console.log("Error Updating FIll In The Blank", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteBlank = async (req, res) => {
  try {
    const blank = await Blank.findByIdAndDelete(req.params.id);

    if (!blank)
      return res.status(404).json({ message: "Fill In The Blank Not Found" });

    res.status(200).json({ message: "Fill In The Blank Deleted Successfully" });
  } catch (error) {
    console.log("Error Deleting Fill In The Blank", error);
    req.status(500).json({ message: "Internal Server Error" });
  }
};
