const { Post, User, Comment } = require('../models');

const homeController = {
  // Handle GET request to the homepage
  getHomePage: async (req, res) => {
    try {
      // Fetch existing blog posts
      const posts = await Post.findAll({
        include: [
          { model: User, attributes: ['username'] },
          { model: Comment, include: [{ model: User, attributes: ['username'] }] }
        ],
        order: [['createdAt', 'DESC']],
      });

      // Render the homepage view with blog posts
      res.render('homepage', { posts });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = homeController;
