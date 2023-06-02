// Import necessary modules and dependencies
const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.create({ username, password });
      req.session.user = user;
      res.redirect('/');
    } catch (error) {
      res.status(500).send('An error occurred');
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (user && user.password === password) {
        req.session.user = user;
        res.redirect('/');
      } else {
        res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      res.status(500).send('An error occurred');
    }
  });

// Export the router
module.exports = router;