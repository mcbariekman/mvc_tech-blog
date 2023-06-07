// user.js

const { User } = require('../models');
const bcrypt = require('bcrypt');

const userData = [
  {
    username: 'user1',
    password: bcrypt.hashSync('password1', 10),
  },
  {
    username: 'user2',
    password: bcrypt.hashSync('password2', 10),
  },
  {
    username: 'user3',
    password: bcrypt.hashSync('password3', 10),
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
