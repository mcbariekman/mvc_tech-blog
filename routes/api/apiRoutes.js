// Import necessary modules and dependencies
const express = require('express');
const router = express.Router();
const { BlogPost } = require('../models');

// Get all blog posts
router.get('/posts', async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll();
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Export the router
module.exports = router;
