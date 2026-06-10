import express from "express"
import { getBooks, createBook, deleteBook,  updateBook } from "../controllers/bookControllers.js"

const router = express.Router()

router.get("/", getBooks)
router.post("/create", createBook)
router.put("/update/:id", updateBook)
router.delete("/delete/:id", deleteBook)

export default router;