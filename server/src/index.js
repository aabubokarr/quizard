import express from "express";
import bookRoutes from "./routes/bookRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

app.use("/book", bookRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening server on port ${PORT}`);
  });
});
