const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// Route for user signup
router.post('/signup', async (req, res) => {
  try {
    // Get the user input from the request body
    const { username, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = await User.create({ username, password: hashedPassword });

    // Send a success response
    res.status(200).json({ message: 'User signup successful' });
  } catch (error) {
    // Send an error response
    res.status(500).json({ message: 'User signup failed', error: error.message });
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    // Get the user input from the request body
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    // If the user doesn't exist, send an error response
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is invalid, send an error response
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // If the username and password are valid, send a success response
    res.status(200).json({ message: 'User login successful' });
  } catch (error) {
    // Send an error response
    res.status(500).json({ message: 'User login failed', error: error.message });
  }
});

module.exports = router;
