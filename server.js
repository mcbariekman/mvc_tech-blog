const express = require('express');
const sequelize = require('sequelize');

const app = express();

// Create the database connection
const db = new sequelize('techblog', 'root', '120399', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define the models
const User = db.define('User', {
  username: {
    type: sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

// Sync the models with the database
db.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
