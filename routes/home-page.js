var logger = require('winston')
  , config = require('../config')
  , tweet = require('../modules/util/tweet')
  , async = require('async')
  , db = require('../modules/db')
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

  var logged_in = function(req, res, next) {
    if (req.user) {
      next();
    } else {
      req.flash('info', 'Please sign in first, thanks!');
      res.redirect('/');
    }
  }

  var signed_up = function(req, res, next) {
    if (req.user.email) {
      next();
    } else {
      res.redirect('/signup');
    }
  }

  app.get('/auth/success', signed_up, function(req, res) {
    res.redirect('/');
  });

  app.get('/auth/failure', function(req, res) {
    res.redirect('/');
  });  

  app.get('/signup', logged_in, function(req, res) {
    res.render('signup', {
      tweet_url: tweet.createTweetIntentUrl(config.nav_bar.tweet) 
    });
  });

  app.post('/signup', function(req, res) {
    var new_user = {};
    new_user.email = req.body.email; //TODO: Validate email address.
    new_user.created = new Date();
    new_user.provider_id = req.user.id;
    new_user.provider = req.user.provider;
    new_user.username = req.user.username;
    new_user.display_name = req.user.display_name;
    new_user.photo_url = req.user.photo_url;
    var new_user_model = new db.models.User(new_user);
    new_user_model.save(function(err, user) {
      if (err) {
        logger.error('problem creating user: ' + req.body.email, err);
        req.flash('error', 'There was a problem creating your user account');
        res.redirect('/signup');
      } else {     
        logger.info('created user: ' + req.body.email, err);
        req.flash('success', 'Successfully created your account! Sent email to ' + req.body.email);
        res.redirect('/');
      }
    });
  });  
}