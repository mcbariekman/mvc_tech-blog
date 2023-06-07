//comment.js

const { Comment } = require('../models');

const commentData = [
  {
    user_id: 1,
    post_id: 5,
    comment_text: "Great job!"
  },
  {
    user_id: 4,
    post_id: 4,
    comment_text: "Congratulations!"
  },
  {
    user_id: 1,
    post_id: 4,
    comment_text: "Awesome work!"
  },
  {
    user_id: 3,
    post_id: 5,
    comment_text: "Fantastic!"
  },
  {
    user_id: 3,
    post_id: 2,
    comment_text: "This is great news!"
  },
  {
    user_id: 3,
    post_id: 4,
    comment_text: "Holy moly! Nice!!!"
  },
  {
    user_id: 5,
    post_id: 3,
    comment_text: "Very useful!"
  },
  {
    user_id: 2,
    post_id: 1,
    comment_text: "Nice!"
  }
];

const seedComments = async () => {
  try {
    await Comment.sync({ force: true }); // Drop existing table and re-create it
    await Comment.bulkCreate(commentData);
    console.log('Comments seeded successfully!');
  } catch (error) {
    console.error('Error seeding comments:', error);
  }
};

module.exports = seedComments;
