// IMPORTS 
import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";

//  ROUTER
const router = express.Router();

//  ROUTES
router.get("/", protect, getRecipes);
router.post("/", protect, createRecipe);
router.put("/:id", protect, updateRecipe);
router.delete("/:id", protect, deleteRecipe);

// EXPORT
export default router;