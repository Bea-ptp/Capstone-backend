import express from 'express';
import Spice from '../models/Spice.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/spices
router.get('/', protect, async (req, res) => {
  try {
    const spices = await Spice.find({ createdBy: req.user._id });
    res.json(spices);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/spices
router.post('/', protect, async (req, res) => {
  // ...
});

// PUT /api/spices/:id
router.put('/:id', protect, async (req, res) => {
  // ...
});

// DELETE /api/spices/:id
router.delete('/:id', protect, async (req, res) => {
  // ...
});

export default router;
