import Spice from '../models/Spice.js';

// GET all spices for user 
export const getspices = async (req, res) => {
    try {
        const spices = await Spice.find({ createdBy: req.user._id });
        res.json(spices);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
        }
};

// CREATE spice 
export const createSpice = async (req, res) => {
  try {
    const { name, flavorProfile, heatLevel } = req.body;

    const spice = await Spice.create({
      name,
      flavorProfile,
      heatLevel,
      createdBy: req.user._id
    });

    res.status(201).json(spice);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// UPDATE spice 
export const updateSpice = async (req, res) => {
    try{
        const spice = await Spice.findById(req.params.id);

        if(!spice) return res.status(404).json({ message: 'Spice not found' }); 
    
        if(spice.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: ' Not authorized' });
        }
            
     const updatedd = await Spice.findByIdAndUpdate(req.params.id, req.body); 
      res.json(updated);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
// DELETE spice
export const deleteSpice = async (req, res) => {
  try {
    const spice = await Spice.findById(req.params.id);

    if (!spice) return res.status(404).json({ message: 'Spice not found' });
    if (spice.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await spice.deleteOne();
    res.json({ message: 'Spice deleted' });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 

