import express from 'express'; 
import dotenv from 'dotenv'; 
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import spiceRoutes from './routes/spiceRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';

dotenv.config();

const app = express(); 

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes 
app.use('/api/auth', authRoutes);
app.use('/api/spices', spiceRoutes);
app.use('/api/recipes', recipeRoutes);

// Start server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));