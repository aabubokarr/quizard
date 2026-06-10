import Book from "../models/book.js";

export const getBooks = async (_, res) => {
  try {
    const book = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(book);
  } catch (error) {
    console.error("Error Fetching Books", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, description } = req.body;
    const book = new Book({ title, description });

    const saveBook = await book.save();
    res.status(201).json(saveBook);
  } catch (error) {
    console.error("Error Creating Book", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { title, description } = req.body;
    const upEbook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    if (!upEbook) return res.status(404).json({ message: "Book Not Found" });

    res.status(200).json(upEbook);
  } catch (error) {
    console.error("Error Updating Book", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const delEbook = await Book.findByIdAndDelete(req.params.id);

    if (!delEbook) return res.status(404).json({ message: "Book Not Found" });
    res.status(200).json({ message: "Book Deleted Successfully" });
  } catch (error) {
    console.error("Error Deleting Book", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
