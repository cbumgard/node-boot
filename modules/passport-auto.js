var passport = require('passport')
  , _ = require('underscore')
  , logger = require('winston')
;

module.exports = function(app, opts) {
  passport.serializeUser(function(user, done) {  
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    done(null, id);
  });

  _.each(opts, function(strategyOpts, strategyName) {
    logger.info('Auto-mounting routes for Passport OAuth strategy: ' + strategyName);
    var strategyModule = require('passport-' + strategyName).Strategy;
    passport.use(new strategyModule(strategyOpts, 
      function(accessToken, refreshToken, profile, done) {
        var user = {};
        user.provider = profile.provider;
        user.id = profile.id;
        user.username = profile.username;
        user.display_name = profile.displayName;
        user.photo_url = strategyOpts.photoUrl(profile);
        logger.info('[passport-' + profile.provider + '] successful login by ' + user.username);
        done(null, user);
      }
    ));
    // Mount OAuth routes for each strategy:
    app.get('/auth/' + strategyName, passport.authenticate(strategyName));
    app.get('/auth/' + strategyName + '/callback',
      passport.authenticate(strategyName, { successRedirect: '/',
                                            failureRedirect: '/' }));      
  });
}