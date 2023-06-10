const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');
const { ensureAuthenticated } = require('../middleware/auth');

const getSinglePost = async (req, res) => {
  try {
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

    res.render('single-post', { post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createComment = async (req, res) => {
  try {
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
};

const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.update(
      { content: req.body.content },
      {
        where: {
          id: req.params.commentId,
          user_id: req.session.user_id,
          post_id: req.params.id,
        },
      }
    );

    res.status(200).json(updatedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteComment = async (req, res) => {
  try {
    await Comment.destroy({
      where: {
        id: req.params.commentId,
        user_id: req.session.user_id,
        post_id: req.params.id,
      },
    });

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Route to create a new blog post
router.post('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    const { title, content } = req.body;

    const newPost = await Post.create({
      title,
      content,
      userId: req.user.id,
    });

    res.status(200).json({ message: 'New post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Error creating new post', error: error.message });
  }
});

// Route to delete a blog post
router.delete('/dashboard/:postId', ensureAuthenticated, async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findByPk(postId);

    if (post.userId !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await post.destroy();

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
});

router.get('/post/:id', getSinglePost);
router.post('/post/:id/comment', createComment);
router.put('/post/:id/comment/:commentId', updateComment);
router.delete('/post/:id/comment/:commentId', deleteComment);

module.exports = router;
