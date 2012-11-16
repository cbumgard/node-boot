var home_page = require('./home-page')
  , facebook = require('./facebook')
  , twitter = require('./twitter')
  , passport = require('passport')
;

passport.serializeUser(function(user, done) {  
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

module.exports = function(app) {  
  home_page(app);
  facebook(app, passport);
  twitter(app, passport);
}