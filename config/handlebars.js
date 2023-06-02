const exphbs = require('express-handlebars');

module.exports = function (app) {
  app.engine(
    'handlebars',
    exphbs({
      defaultLayout: 'main',
      layoutsDir: 'views/layouts',
      partialsDir: 'views/partials',
    })
  );
  app.set('view engine', 'handlebars');
};
