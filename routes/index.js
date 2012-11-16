var home_page = require('./home-page.js');

module.exports = function(app) {
  app.get('/', home_page.root);
  app.get('/logout', home_page.logout);
}