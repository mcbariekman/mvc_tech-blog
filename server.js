const express = require('express');
const session = require('express-session');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'secret_key', resave: false, saveUninitialized: false }));

// Database connection
const db = new Sequelize('techblog', 'root', '120399', {
  host: 'localhost',
  dialect: 'mysql',
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
