import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

async function register(req, res) {
    console.log('Received registration request with data:', req.body); // Debug log
 try {
    console.log('Registering user with data:', req.body); // Debug log
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email});
    if (userExists) {
        return res.status(400).json({ message: 'User already exists'});
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email, 
        password: hashedPassword
    });

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
         });

        } catch (err) {
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    }; 

// PUBLIC ROUTES — NO TOKEN REQUIRED
router.post('/register', registerUser   );
router.post('/login', loginUser);

export default router;



