const express = require('express');
const router = express.Router();
const { User, Post } = require('../models');
const { ensureAuthenticated } = require('../middleware/auth');

// Route to display the user's dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    // Retrieve the user's posts from the database
    const posts = await Post.findAll({ where: { userId: req.user.id } });

    // Render the dashboard view with the user's posts
    res.render('dashboard', { user: req.user, posts });
  } catch (error) {
    // Send an error response
    res.status(500).json({ message: 'Error retrieving dashboard', error: error.message });
  }
});

// Route to create a new blog post
router.post('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    // Get the post data from the request body
    const { title, content } = req.body;

    // Create a new post for the logged-in user
    const newPost = await Post.create({
      title,
      content,
      userId: req.user.id,
    });

    // Send a success response
    res.status(200).json({ message: 'New post created successfully', post: newPost });
  } catch (error) {
    // Send an error response
    res.status(500).json({ message: 'Error creating new post', error: error.message });
  }
});

// Route to delete a blog post
router.delete('/dashboard/:postId', ensureAuthenticated, async (req, res) => {
  try {
    // Get the post ID from the request parameters
    const postId = req.params.postId;

    // Find the post by ID
    const post = await Post.findByPk(postId);

    // Check if the post belongs to the logged-in user
    if (post.userId !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Delete the post
    await post.destroy();

    // Send a success response
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    // Send an error response
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
});

module.exports = router;
