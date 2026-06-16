// IMPORTS
import Spice from "../models/Spice.js";

// GET ALL SPICES
export async function getSpices(req, res) {
  try {
    const spices = await Spice.find({ createdBy: req.user._id });
    res.json(spices);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// CREATE SPICE
export async function createSpice(req, res) {
  try {
    const spice = await Spice.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(spice);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
}

// UPDATE SPICE
export async function updateSpice(req, res) {
  try {
    const spice = await Spice.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );
    res.json(spice);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
}

// DELETE SPICE
export async function deleteSpice(req, res) {
  try {
    await Spice.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    res.json({ message: "Spice deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err.message });
  }
}