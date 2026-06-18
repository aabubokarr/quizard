import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import blankRoutes from "./routes/blankRoutes.js";
import mcqRoutes from "./routes/mcqRoutes.js";
import truefalseRoutes from "./routes/truefalseRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

app.use("/blank", blankRoutes);
app.use("/mcq", mcqRoutes);
app.use("/truefalse", truefalseRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening server on port ${PORT}`);
  });
});
