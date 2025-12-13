// backend/routes/lostRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import LostItem from "../models/LostItem.js";

const router = express.Router();

// Multer storage (save files to /uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `lost-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// ✅ POST with file: field name must be "image"
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, category, lastSeenLocation, description } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const item = await LostItem.create({
      title,
      category,
      lastSeenLocation,
      description,
      imageUrl,
    });

    res.status(201).json(item);
  } catch (err) {
    console.error("Error creating lost item:", err);
    res.status(500).json({ message: "Error creating lost item", error: err.message });
  }
});

// GET all
router.get("/", async (req, res) => {
  try {
    const items = await LostItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching lost items", error: err.message });
  }
});

export default router;
