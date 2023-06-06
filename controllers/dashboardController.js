const { User, Post } = require('../models');

const dashboardController = {
  // Handle GET request to the dashboard page
  getDashboardPage: async (req, res) => {
    try {
      // Fetch blog posts associated with the logged-in user
      const posts = await Post.findAll({
        where: { user_id: req.session.user_id },
        include: [{ model: User, attributes: ['username'] }],
        order: [['createdAt', 'DESC']],
      });

      // Render the dashboard view with user's blog posts
      res.render('dashboard', { posts });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Handle POST request to create a new blog post
  createPost: async (req, res) => {
    try {
      // Create a new blog post associated with the logged-in user
      const newPost = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      });

      res.status(200).json(newPost);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Handle GET request to edit a blog post
  editPost: async (req, res) => {
    try {
      // Fetch the blog post based on the post ID and logged-in user
      const post = await Post.findOne({
        where: { id: req.params.id, user_id: req.session.user_id },
      });

      if (!post) {
        res.status(404).json({ message: 'Blog post not found' });
        return;
      }

      // Render the edit post view with the blog post data
      res.render('edit-post', { post });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Handle PUT request to update a blog post
  updatePost: async (req, res) => {
    try {
      // Update the blog post based on the post ID and logged-in user
      const updatedPost = await Post.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: { id: req.params.id, user_id: req.session.user_id },
        }
      );

      res.status(200).json(updatedPost);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Handle DELETE request to delete a blog post
  deletePost: async (req, res) => {
    try {
      // Delete the blog post based on the post ID and logged-in user
      await Post.destroy({
        where: { id: req.params.id, user_id: req.session.user_id },
      });

      res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = dashboardController;
