import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title:         { type: String, required: true },
  ingredients:   { type: [String], required: true },
  instructions:  { type: [String], required: true },
  image:         { type: String },
  spicesUsed:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spice' }],
  createdBy:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Recipe', recipeSchema);