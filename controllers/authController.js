import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// REGISTER 
export const registerUser = async (req, res) => {
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
    
    // LOGIN
    export const loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email});
            if (!user) return res.status(400).json({ message: 'Invalid credentials'});

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials'});

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });

        } catch (err) {
           return res.status(500).json({ message: 'Server error', error: err.message });
        }
        };

        // GET LOGGED-In USER
        export const getMe = async (req, res) => {
            res.json(req.user); 

};

// LOGOUT
export const logoutUser = async (req, res) => {
    res.json({ message: 'Logged out successfully' });
};