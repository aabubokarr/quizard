import express from "express";
import {
  getBlank,
  createBlank,
  updateBlank,
  deleteBlank,
} from "../controllers/blank.controllers.js";

const router = express.Router();

router.get("/", getBlank);
router.post("/create", createBlank);
router.put("/update", updateBlank);
router.delete("/delete", deleteBlank);

export default router;
