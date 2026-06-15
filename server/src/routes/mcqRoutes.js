import express from "express";
import {
  getMcq,
  createMcq,
  updateMcq,
  deleteMcq,
} from "../controllers/mcq.controllers.js";

const router = express.Router();

router.get("/", getMcq);
router.post("/create", createMcq);
router.put("/update", updateMcq);
router.delete("/delete", deleteMcq);

export default router;
