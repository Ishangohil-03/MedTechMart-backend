// models/userModel.js

const mySqlPool = require('../config/db');

const createUser = async (userData) => {
  const { username, password, email, phone, address, city, state, zip, countryCode, profile_photo, role } = userData;
  const [result] = await mySqlPool.query(
    'INSERT INTO users (username, password, email, phone, address, city, state, zip, countryCode, profile_photo, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [username, password, email, phone, address, city, state, zip, countryCode, profile_photo, role || 'user']
  );
  return result;
};

const findUserByUsername = async (username) => {
  const [rows] = await mySqlPool.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

const deleteUserById = async (userId) => {
  const [result] = await mySqlPool.query('DELETE FROM users WHERE id = ?', [userId]);
  return result;
};

module.exports = { createUser, findUserByUsername, deleteUserById };
