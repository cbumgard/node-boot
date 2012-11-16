var config = require('../config')  
  , TwitterStrategy = require('passport-twitter').Strategy
  , logger = require('winston')
;

module.exports = function(app, passport) {
  if (config.passport && config.passport.twitter_opts) {
    passport.use(new TwitterStrategy(
      config.passport.twitter_opts,
      function(accessToken, refreshToken, profile, done) {
        var user = {};
        user.provider = profile.provider;
        user.id = profile.id;
        user.username = profile.username;
        user.display_name = profile.displayName;
        user.photo_url = profile.photos[0].value;
        logger.info('successful Twitter login by ' + user.username);
        done(null, user);
      }
    ));
  }

  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { successRedirect: '/',
                                       failureRedirect: '/' }));
}