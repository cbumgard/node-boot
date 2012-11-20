var home_page = require('./home-page')
  , config = require('../config')
  , passport_auto = require('../modules/passport-auto')
;

module.exports = function(app) {  
  home_page(app);
  // Auto-mount routes for various 3rd party OAuth services
  // that support Passport, e.g. Facebook, Twitter, GitHub:
  passport_auto(app, config.passport);
}