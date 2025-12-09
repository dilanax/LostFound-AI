// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import lostRoutes from "./routes/lostRoutes.js";
import foundRoutes from "./routes/foundRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Lost & Found API running");
});

// Routes
app.use("/api/lost", lostRoutes);
app.use("/api/found", foundRoutes);
app.use("/api/match", matchRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log("DB Error:", err));
