import mongoose from "mongoose";

const spiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    flavorProfile: { type: String },
    heatLevel: { type: Number, default: 0 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Spice", spiceSchema);