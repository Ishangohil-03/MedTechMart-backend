// routes/authRoutes.js

const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const upload = require('../middleware/upload'); // Import multer middleware

const router = express.Router();

// POST route for registration with profile photo upload
router.post('/register', upload.single('profile_photo'), register);

// POST route for login
router.post('/login', login);

// POST route for logout
router.post('/logout', logout)

module.exports = router;
