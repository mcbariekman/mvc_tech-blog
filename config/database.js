const { Sequelize } = require('sequelize');

// Create a new Sequelize instance and pass the database credentials
const sequelize = new Sequelize('techblog', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
