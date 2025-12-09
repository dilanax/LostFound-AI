import express from "express";
import LostItem from "../models/LostItem.js";
import FoundItem from "../models/FoundItem.js";

const router = express.Router();

// Simple match: Check category similarity
router.get("/:lostId", async (req, res) => {
  try {
    const lost = await LostItem.findById(req.params.lostId);
    if (!lost) return res.status(404).json({ message: "Lost item not found" });

    const matches = await FoundItem.find({
      category: lost.category
    });

    res.json({ lost, matches });
  } catch (err) {
    res.status(500).json({ message: "Error matching items", error: err });
  }
});

export default router;
