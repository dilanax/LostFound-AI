import express from "express";
import FoundItem from "../models/FoundItem.js";

const router = express.Router();

// Create found item
router.post("/", async (req, res) => {
  try {
    const item = await FoundItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Error creating found item", error: err });
  }
});

// Get all found items
router.get("/", async (req, res) => {
  try {
    const items = await FoundItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching found items", error: err });
  }
});

export default router;
