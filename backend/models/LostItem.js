import mongoose from "mongoose";

const lostItemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    category: String,
    imageUrl: String,
    lastSeenLocation: String,
    status: { type: String, default: "lost" }
  },
  { timestamps: true }
);

export default mongoose.model("LostItem", lostItemSchema);
