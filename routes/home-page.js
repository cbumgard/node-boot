var logger = require('winston')
  , config = require('../config')
  , tweet = require('../modules/util/tweet')
;

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('home-page', { 
      tweet_url: tweet.createTweetIntentUrl(config.nav_bar.tweet) 
    });
  });

  app.get('/logout', function(req, res) {
    logger.info('Logging out user ' + req.user.username);
    req.logOut();
    res.redirect('/');
  });
}