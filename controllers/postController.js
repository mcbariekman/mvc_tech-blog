const { User, Post, Comment } = require('../models');

const postController = {
  // Handle GET request to view a single blog post
  getSinglePost: async (req, res) => {
    try {
      // Fetch the blog post based on the post ID
      const post = await Post.findOne({
        where: { id: req.params.id },
        include: [
          { model: User, attributes: ['username'] },
          { model: Comment, include: [{ model: User, attributes: ['username'] }] },
        ],
      });

      if (!post) {
        res.status(404).json({ message: 'Blog post not found' });
        return;
      }

      // Render the single post view with the blog post data
      res.render('single-post', { post });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Handle POST request to create a new comment
  createComment: async (req, res) => {
    try {
      // Create a new comment associated with the logged-in user and the blog post
      const newComment = await Comment.create({
        content: req.body.content,
        user_id: req.session.user_id,
        post_id: req.params.id,
      });

      res.status(200).json(newComment);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Handle PUT request to update a comment
  updateComment: async (req, res) => {
    try {
      // Update the comment based on the comment ID, logged-in user, and the associated blog post
      const updatedComment = await Comment.update(
        {
          content: req.body.content,
        },
        {
          where: { id: req.params.commentId, user_id: req.session.user_id, post_id: req.params.id },
        }
      );

      res.status(200).json(updatedComment);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Handle DELETE request to delete a comment
  deleteComment: async (req, res) => {
    try {
      // Delete the comment based on the comment ID, logged-in user, and the associated blog post
      await Comment.destroy({
        where: { id: req.params.commentId, user_id: req.session.user_id, post_id: req.params.id },
      });

      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = postController;
