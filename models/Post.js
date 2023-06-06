const Post = require('../models/Post');

async function createPost(req, res) {
  try {
    const { title, content, userId } = req.body;

    // Validate user input, perform any necessary checks

    // Create a new post using the Post model
    const newPost = await Post.create({ title, content, userId });

    // Handle success response
    return res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    // Handle error response
    return res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
}
