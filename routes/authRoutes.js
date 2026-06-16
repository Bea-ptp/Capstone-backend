// IMPORTS
import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

// ROUTER
const router = express.Router();

// ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);

// EXPORT
export default router;