// Import necessary modules and dependencies
const express = require('express');
const router = express.Router();
const { User, BlogPost, Comment } = require('../models');

// Homepage route
router.get('/', async (req, res) => {
  try {
    // Retrieve existing blog posts from the database
    const blogPosts = await BlogPost.findAll();
    res.render('homepage', { blogPosts });
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

// Signup route
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

// Login route
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

// Logout route
router.post('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/');
});

// Blog post route
router.get('/blog/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const blogPost = await BlogPost.findOne({ where: { id: postId } });
    const comments = await Comment.findAll({ where: { postId } });
    res.render('blogPost', { blogPost, comments });
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

// Add comment route
router.post('/blog/:postId/comment', async (req, res) => {
  try {
    const postId = req.params.postId;
    const { username, content } = req.body;
    const comment = await Comment.create({ postId, username, content });
    res.redirect(`/blog/${postId}`);
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

// Dashboard route
router.get('/dashboard', async (req, res) => {
  try {
    const userId = req.session.user.id;
    const userBlogPosts = await BlogPost.findAll({ where: { userId } });
    res.render('dashboard', { userBlogPosts });
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

// Create blog post route
router.get('/dashboard/new', (req, res) => {
  res.render('createBlogPost');
});

router.post('/dashboard/new', async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.session.user.id;
    const blogPost = await BlogPost.create({ title, content, userId });
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

// Update and delete blog post routes
router.get('/dashboard/edit/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const blogPost = await BlogPost.findOne({ where: { id: postId } });
    res.render('editBlogPost', { blogPost });
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

router.post('/dashboard/edit/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, content } = req.body;
    await BlogPost.update({ title, content }, { where: { id: postId } });
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

router.post('/dashboard/delete/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    await BlogPost.destroy({ where: { id: postId } });
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

// Export the router
module.exports = router;
