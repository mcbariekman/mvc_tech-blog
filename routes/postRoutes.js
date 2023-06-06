const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');
const { ensureAuthenticated } = require('../middleware/auth');

// Create a new blog post
router.post('/', ensureAuthenticated, async (req, res) => {
  try {
    // Get the user ID from the authenticated user
    const userId = req.user.id;

    // Create a new blog post in the database
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      userId: userId,
    });

    // Redirect to the dashboard or the newly created blog post
    res.redirect(`/dashboard/${newPost.id}`);
  } catch (error) {
    // Send an error response
    res.status(500).json({ message: 'Error creating blog post', error: error.message });
  }
});

// Update a blog post
router.put('/:id', ensureAuthenticated, async (req, res) => {
  try {
    // Get the user ID from the authenticated user
    const userId = req.user.id;

    // Find the blog post by ID
    const postId = req.params.id;
    const post = await Post.findByPk(postId);

    // Check if the post exists and the user owns it
    if (!post || post.userId !== userId) {
      return res.status(404).json({ message: 'Blog post not found or unauthorized' });
    }

    // Update the blog post with the new title and content
    await post.update({
      title: req.body.title,
      content: req.body.content,
    });

    // Redirect to the updated blog post
    res.redirect(`/dashboard/${post.id}`);
  } catch (error) {
    // Send an error response
    res.status(500).json({ message: 'Error updating blog post', error: error.message });
  }
});

// Delete a blog post
router.delete('/:id', ensureAuthenticated, async (req, res) => {
  try {
    // Get the user ID from the authenticated user
    const userId = req.user.id;

    // Find the blog post by ID
    const postId = req.params.id;
    const post = await Post.findByPk(postId);

    // Check if the post exists and the user owns it
    if (!post || post.userId !== userId) {
      return res.status(404).json({ message: 'Blog post not found or unauthorized' });
    }

    // Delete the blog post
    await post.destroy();

    // Redirect to the dashboard
    res.redirect('/dashboard');
  } catch (error) {
    // Send an error response
    res.status(500).json({ message: 'Error deleting blog post', error: error.message });
  }
});

module.exports = router;
