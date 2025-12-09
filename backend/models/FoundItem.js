import mongoose from "mongoose";

const foundItemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    category: String,
    imageUrl: String,
    foundLocation: String,
    status: { type: String, default: "found" }
  },
  { timestamps: true }
);

export default mongoose.model("FoundItem", foundItemSchema);
