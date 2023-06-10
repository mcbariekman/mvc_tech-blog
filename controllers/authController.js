const { User } = require('../models');

const authController = {
  // Handle GET request to the signup page
  getSignupPage: (req, res) => {
    res.render('signup');
  },

  // Handle POST request for user signup
  signupUser: async (req, res) => {
    try {
      // Create a new user
      const newUser = await User.create(req.body);

      // Set the user session
      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;
        res.status(200).json(newUser);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Handle GET request to the login page
  getLoginPage: (req, res) => {
    res.render('login');
  },

  // Handle POST request for user login
  loginUser: async (req, res) => {
    try {
      // Find the user by username
      const user = await User.findOne({ where: { username: req.body.username } });

      if (!user) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }

      // Check the user's password
      const isValidPassword = user.checkPassword(req.body.password);

      if (!isValidPassword) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }

      // Set the user session
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        res.status(200).json({ user, message: 'You are now logged in' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Handle POST request for user logout
  logoutUser: (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  }
};

module.exports = authController;

const withAuth = (req,res, next) => {
  if(!req.session.id) {
      res.redirect('/login');
  }else{
      next();
  }
};

module.exports = withAuth;