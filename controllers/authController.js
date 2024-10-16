// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByUsername } = require('../models/userModels');
const path = require('path');
require('dotenv').config();

// const JWT_SECRET = 'your_jwt_secret_key'; // Replace with a secure key
const JWT_SECRET = process.env.JWT_SECRET;


// Register User
const register = async (req, res) => {
  // Extract fields from request body
  const { username, password, email, phone, address, city, state, zip, countryCode } = req.body;
  
  // Handle profile photo
  let profilePhoto = null;
  if (req.file) {
    profilePhoto = req.file.filename; // Store only the filename
  }

  // Validate required fields
  if (!username || !password || !email || !phone || !address || !city || !state || !zip || !countryCode) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if username already exists
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the user
    await createUser({ 
      username, 
      password: hashedPassword, 
      email, 
      phone, 
      address, 
      city, 
      state, 
      zip, 
      countryCode, 
      profile_photo: profilePhoto 
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error); // Log the actual error
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login User
const login = async (req, res) => {
  const { username, password } = req.body;
  
  // Validate required fields
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Find the user by username
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error); // Log the actual error
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

const logout = async (req, res) => {
  return res.status(200).json({ message: 'Logout successful' });
}

module.exports = { register, login, logout };
