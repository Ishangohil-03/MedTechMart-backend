// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
// const PORT = process.env.PORT || 2110;

const PORT = process.env.PORT || 2110;


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Register routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Error handling for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
