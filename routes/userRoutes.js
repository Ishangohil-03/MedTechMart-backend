const express = require('express');
const { deleteUser } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.delete('/deleteUser/:id', authenticateToken, deleteUser);

module.exports = router;
