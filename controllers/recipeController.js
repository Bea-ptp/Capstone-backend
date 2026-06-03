import Recipe from '../models/Recipe.js';

// GET all recipes
export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ createdBy: req.user._id }).populate('spicesUsed');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// CREATE recipe
export const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, image, spicesUsed } = req.body;

    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      image,
      spicesUsed,
      createdBy: req.user._id
    });

    res.status(201).json(recipe);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// UPDATE recipe
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE recipe
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await recipe.deleteOne();

    res.json({ message: 'Recipe deleted' });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
