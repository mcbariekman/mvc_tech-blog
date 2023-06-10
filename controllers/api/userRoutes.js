const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { ensureGuest } = require('../middleware/auth');
const passport = require('passport');

// User registration
router.post('/register', ensureGuest, async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({ username, password: hashedPassword });

    // Log in the user and send a success response
    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in after registration', error: err.message });
      }
      res.status(200).json({ message: 'Registration successful', user: newUser });
    });
  } catch (error) {
    // Send an error response
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// User login
router.post('/login', ensureGuest, passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Login successful', user: req.user });
});

// User logout
router.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
});

// Define the /users route
router.get('/users', (req, res) => {
  // Logic to retrieve all users from the database or any other data source
  // Send the response with the users data
  res.json({ users: [/* array of users */] });
});

module.exports = router;

