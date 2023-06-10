// index.js
const seedUsers = require('./user');
const seedPosts = require('./post');
const seedComments = require('./comment');
const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = require('./userData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();
    await seedComments();

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Database seeding failed:', error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
