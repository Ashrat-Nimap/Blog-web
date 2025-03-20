const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByUsername } = require('../models/userModel');

const register = async (req, res) => {
  const { username, password } = req.body;
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  createUser(username, hashedPassword, (err) => {
    if (err) return res.status(400).json({ message: 'User already exists or error occurred' });
    res.status(201).json({ message: 'User registered successfully' });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  getUserByUsername(username, async (err, user) => {
    if (err || !user) return res.status(400).json({ message: 'Invalid credentials' });
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token valid for 1 hour
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};

module.exports = { register, login };
