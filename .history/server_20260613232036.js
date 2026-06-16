import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";        // already correct
import recipeRoutes from "./routes/recipeRoutes.js";    // ← ADD THIS
import spiceRoutes from "./routes/spiceRoutes.js";      // if you have it

dotenv.config(); // CONFIG + DB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);


// ROUTES GO HERE
app.use("/api/auth", authRoutes);
app.use("/api/spices", spiceRoutes);
app.use("/api/recipes", recipeRoutes);

// START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});