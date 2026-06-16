// IMPORTS
import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getSpices,
  createSpice,
  updateSpice,
  deleteSpice,
} from "../controllers/spiceController.js";

//ROUTER
const router = express.Router();

//ROUTES
router.get("/", protect, getSpices);
router.post("/", protect, createSpice);
router.put("/:id", protect, updateSpice);
router.delete("/:id", protect, deleteSpice);

//EXPORT
export default router;