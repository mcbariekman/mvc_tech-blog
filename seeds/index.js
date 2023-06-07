// index.js

const seedUsers = require('./user');
const seedPosts = require('./post');
const seedComments = require('./comment');

const seedDatabase = async () => {
  try {
    await seedUsers();
    await seedPosts();
    await seedComments();

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Database seeding failed:', error);
  }
};

seedDatabase();
