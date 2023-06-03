const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// Handler for GET request to the root URL ("/")
router.get('/', async (req, res) => {
  try {
    // Retrieve the latest blog posts from the database
    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10, // Limit the number of posts to display
    });

    // Render the home view and pass the retrieved posts as data
    res.render('home', { posts });
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
