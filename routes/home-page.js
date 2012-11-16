var logger = require('winston');

exports.root = function(req, res) {
  res.render('home-page');
}

exports.logout = function(req, res) {
  logger.info('Logging out user');
  req.logOut();
  res.redirect('/');
}