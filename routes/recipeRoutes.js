import express from 'express';
import Recipe from '../models/Recipe.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/recipes
router.get('/', protect, async (req, res) => {
  try {
    const recipes = await Recipe.find({ createdBy: req.user._id }).populate('spicesUsed');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/recipes
router.post('/', protect, async (req, res) => {
  // ...
});

// PUT /api/recipes/:id
router.put('/:id', protect, async (req, res) => {
  // ...
});

// DELETE /api/recipes/:id
router.delete('/:id', protect, async (req, res) => {
  // ...
});

export default router;
