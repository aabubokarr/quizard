import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import mcqRoutes from "./routes/mcqRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

app.use("/mcq", mcqRoutes)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening server on port ${PORT}`);
  });
});
