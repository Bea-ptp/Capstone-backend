import mongoose from "mongoose";
import Recipe from "./models/Recipe.js";
import dotenv from "dotenv";

dotenv.config();

const USER_ID = "6a2a2dc9389ea8fbf53f0721";

const recipes = [
  {
    title: "Spicy Garlic Chicken",
    ingredients: [
      "2 chicken breasts",
      "3 cloves garlic",
      "1 tbsp olive oil",
      "1 tsp paprika",
      "Salt and pepper"
    ],
    instructions: [
      "Season chicken with paprika, salt, and pepper.",
      "Heat oil in a pan.",
      "Add garlic and sauté.",
      "Cook chicken until golden.",
      "Serve hot."
    ],
    image: "https://via.placeholder.com/300",
    spicesUsed: [],
    createdBy: USER_ID
  },
  {
    title: "Creamy Coconut Curry",
    ingredients: [
      "1 can coconut milk",
      "1 onion",
      "2 tbsp curry powder",
      "1 cup vegetables",
      "Salt"
    ],
    instructions: [
      "Sauté onions.",
      "Add curry powder.",
      "Pour coconut milk.",
      "Add vegetables and simmer.",
      "Serve with rice."
    ],
    image: "https://via.placeholder.com/300",
    spicesUsed: [],
    createdBy: USER_ID
  },
  {
    title: "Herb Roasted Potatoes",
    ingredients: [
      "4 potatoes",
      "1 tbsp rosemary",
      "1 tbsp thyme",
      "2 tbsp olive oil",
      "Salt"
    ],
    instructions: [
      "Cut potatoes into cubes.",
      "Mix with herbs and oil.",
      "Bake at 200°C for 35 minutes.",
      "Serve warm."
    ],
    image: "https://via.placeholder.com/300",
    spicesUsed: [],
    createdBy: USER_ID
  },
  {
    title: "Tomato Basil Pasta",
    ingredients: [
      "200g pasta",
      "2 tomatoes",
      "Fresh basil",
      "1 tbsp olive oil",
      "Salt"
    ],
    instructions: [
      "Cook pasta.",
      "Chop tomatoes.",
      "Mix pasta with tomatoes, basil, and oil.",
      "Season and serve."
    ],
    image: "https://via.placeholder.com/300",
    spicesUsed: [],
    createdBy: USER_ID
  },
  {
    title: "Honey Lemon Salmon",
    ingredients: [
      "1 salmon fillet",
      "1 tbsp honey",
      "1 tbsp lemon juice",
      "Salt and pepper"
    ],
    instructions: [
      "Mix honey and lemon.",
      "Brush salmon with mixture.",
      "Bake at 180°C for 15 minutes.",
      "Serve with vegetables."
    ],
    image: "https://via.placeholder.com/300",
    spicesUsed: [],
    createdBy: USER_ID
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Recipe.deleteMany({});
    console.log("Old recipes removed");

    await Recipe.insertMany(recipes);
    console.log("New recipes inserted");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();