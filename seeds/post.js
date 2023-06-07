// post.js

const { Post } = require('../models');

const postData = [
  {
    title: 'First Post',
    content: 'This is the content of the first post.',
    userId: 1, // Replace with the appropriate user ID
  },
  {
    title: 'Second Post',
    content: 'This is the content of the second post.',
    userId: 2, // Replace with the appropriate user ID
  },
  // Add more post data as needed
];

const seedPosts = async () => {
  try {
    // Create posts using the Post model
    await Post.bulkCreate(postData);

    console.log('Posts seeded successfully');
  } catch (error) {
    console.error('Failed to seed posts:', error);
  }
};

module.exports = seedPosts;
