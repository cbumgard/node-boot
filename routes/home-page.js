var logger = require('winston');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('home-page');
  });

  app.get('/logout', function(req, res) {
    logger.info('Logging out user ' + req.user.username);
    req.logOut();
    res.redirect('/');
  });
}