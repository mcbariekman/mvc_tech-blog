const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password }); // Create a new user in the database
    req.session.user = user; // Store the user object in the session
    res.redirect('/'); // Redirect the user to the root URL after signup
  } catch (error) {
    res.status(500).send('An error occurred'); // Handle any error that occurs during the signup process
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } }); // Find a user with the provided username
    if (user && user.password === password) { // Check if the user exists and the password matches
      req.session.user = user; // Store the user object in the session
      res.redirect('/'); // Redirect the user to the root URL after login
    } else {
      res.status(401).send('Invalid credentials'); // Send an error response if the username or password is incorrect
    }
  } catch (error) {
    res.status(500).send('An error occurred'); // Handle any error that occurs during the login process
  }
});

module.exports = router;
