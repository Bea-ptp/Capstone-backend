// IMPORTS
import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getSpices,
  createSpice,
  updateSpice,
  deleteSpice,
} from "../controllers/spiceController.js";
import Spice from "../models/Spice.js";

// ROUTER
const router = express.Router();

// GET all spices
router.get("/", protect, getSpices);

// ⭐ GET one spice (needed for Edit Spice)
router.get("/:id", protect, async (req, res) => {
  try {
    const spice = await Spice.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!spice) {
      return res.status(404).json({ message: "Spice not found" });
    }

    res.json(spice);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// CREATE spice
router.post("/", protect, createSpice);

// UPDATE spice
router.put("/:id", protect, updateSpice);

// DELETE spice
router.delete("/:id", protect, deleteSpice);

// EXPORT
export default router;