//  IMPORTS
import Recipe from "../models/Recipe.js";

//  GET ALL RECIPES
export async function getRecipes(req, res) {
  try {
    const recipes = await Recipe.find({ createdBy: req.user._id });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// CREATE RECIPE
export async function createRecipe(req, res) {
  try {
    const recipe = await Recipe.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
}

// UPDATE RECIPE
export async function updateRecipe(req, res) {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
}

// DELETE RECIPE
export async function deleteRecipe(req, res) {
  try {
    await Recipe.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err.message });
  }
}