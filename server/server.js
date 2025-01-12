import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import Event from "./models/event.model.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

app.post("/api/create", async (req, res) => {
  const event = req.body;

  if (!event.title || !event.image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newEvent = new Event(event);

  try {
    await newEvent.save();
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

app.put("/api/update/:id", async (req, res) => {
  const { id } = req.params;
  const event = req.body;

  if (!event.title || !event.image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, event, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    res.status(404).json({ success: false, message: "Event not found" });
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Event.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Event deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Event not found" });
  }
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
