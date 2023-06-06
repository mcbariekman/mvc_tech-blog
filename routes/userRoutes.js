const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { ensureGuest } = require('../middleware/auth');

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
router.post('/login', ensureGuest, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Error authenticating user', error: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in', error: err.message });
      }
      res.status(200).json({ message: 'Login successful', user: user });
    });
  })(req, res, next);
});

// User logout
router.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
