import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";
import Recipe from "../models/Recipe.js";

const router = express.Router();

// GET all recipes
router.get("/", protect, getRecipes);

// ⭐ GET one recipe (needed for Edit Recipe)
router.get("/:id", protect, async (req, res) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// CREATE recipe
router.post("/", protect, createRecipe);

// UPDATE recipe
router.put("/:id", protect, updateRecipe);

// DELETE recipe
router.delete("/:id", protect, deleteRecipe);

export default router;