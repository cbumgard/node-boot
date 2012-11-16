var config = require('../config')
  , FacebookStrategy = require('passport-facebook').Strategy
  , logger = require('winston')
;

module.exports = function(app, passport) {
  if (config.passport && config.passport.facebook_opts) {
    passport.use(new FacebookStrategy(
      config.passport.facebook_opts,
      function(accessToken, refreshToken, profile, done) {
        var user = {};
        user.provider = profile.provider;
        user.id = profile.id;
        user.username = profile.username;
        user.display_name = profile.displayName;
        user.photo_url = 
          'https://graph.facebook.com/' + user.username + '/picture?type=square&return_ssl_resources=1';
        logger.info('successful Facebook login by ' + user.username);  
        done(null, user);
      }
    ));
  }

  // Redirect the user to Facebook for authentication.  When complete,
  // Facebook will redirect the user back to the application at
  // /auth/facebook/callback
  app.get('/auth/facebook', 
    passport.authenticate('facebook')
  );

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { successRedirect: '/',
                                        failureRedirect: '/' }));
}