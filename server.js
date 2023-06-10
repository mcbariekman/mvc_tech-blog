const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const postController = require('./controllers/postController');
const authController = require('./controllers/authController');
const homeController = require('./controllers/homeController');

const app = express();
const PORT = process.env.PORT || 3001;

// Create the Handlebars.js engine object with custom helper functions
const hbs = exphbs.create({ helpers });

// Inform Express.js which template engine we're using
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Add a console.log statement before and after each step

console.log('Step 1: Before configuring middleware');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

console.log('Step 2: After configuring middleware');

app.use('/', homeController);
app.use('/posts', postController);
app.use('/auth', authController);

console.log('Step 3: After mounting controllers');

sequelize.sync({ force: false }).then(() => {
  console.log('Step 4: Inside sequelize.sync');
  app.listen(PORT, () => console.log('Now listening on port', PORT));
});
