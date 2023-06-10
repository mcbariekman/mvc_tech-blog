const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');

// Homepage route
router.get('/', async (req, res) => {
  try {
    // Retrieve all blog posts from the database
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['content', 'date_created'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    // Render the homepage view with the blog posts
    res.render('homepage', { posts });
  } catch (error) {
    // Send an error response
    res.status(500).json({ message: 'Error retrieving blog posts', error: error.message });
  }
});

// Blog post route
router.get('/post/:id', async (req, res) => {
  try {
    // Retrieve the blog post with the specified ID
    const postId = req.params.id;
    const post = await Post.findByPk(postId, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['content', 'date_created'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Render the blog post view with the post details
    res.render('post', { post });
  } catch (error) {
    // Send an error response
    res.status(500).json({ message: 'Error retrieving blog post', error: error.message });
  }
});

module.exports = router;
