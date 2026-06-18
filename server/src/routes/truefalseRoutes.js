import express from "express";
import {
  getTrueFalse,
  createTrueFalse,
  updateTrueFalse,
  deleteTrueFalse,
} from "../controllers/truefalse.controllers.js";

const router = express.Router();

router.get("/", getTrueFalse);
router.post("/create", createTrueFalse);
router.put("/update", updateTrueFalse);
router.delete("/delete", deleteTrueFalse);

export default router;
