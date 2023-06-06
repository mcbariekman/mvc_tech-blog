const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// Get user's dashboard
router.get('/', async (req, res) => {
  try {
    // Retrieve the user's blog posts from the database
    const posts = await Post.findAll({ where: { userId: req.session.user.id } });

    // Render the dashboard view and pass the retrieved posts as data
    res.render('dashboard', { posts });
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

// Add a new blog post
router.post('/add', async (req, res) => {
  try {
    const { title, content } = req.body;

    // Create a new post associated with the current user
    await Post.create({
      title,
      content,
      userId: req.session.user.id
    });

    res.redirect('/dashboard'); // Redirect the user back to the dashboard
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

// Update a blog post
router.post('/update/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;

    // Find the post by ID and update its title and content
    await Post.update({ title, content }, { where: { id: postId } });

    res.redirect('/dashboard'); // Redirect the user back to the dashboard
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

// Delete a blog post
router.post('/delete/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    // Delete the post by ID
    await Post.destroy({ where: { id: postId } });

    res.redirect('/dashboard'); // Redirect the user back to the dashboard
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
