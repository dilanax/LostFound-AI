import express from "express";
import LostItem from "../models/LostItem.js";

const router = express.Router();

// Create lost item
router.post("/", async (req, res) => {
  try {
    const item = await LostItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Error creating lost item", error: err });
  }
});

// Get all lost items
router.get("/", async (req, res) => {
  try {
    const items = await LostItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching lost items", error: err });
  }
});

export default router;
