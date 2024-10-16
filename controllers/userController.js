const { deleteUserById } = require('../models/userModels');

// Delete User
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await deleteUserById(userId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

module.exports = { deleteUser };
