exports.app = app = {
  title: 'node-boot',
  host: 'localhost',
  port: 8000,
  ssl: false,
  cluster: false
}

exports.nav_bar = {
  tweet: {
    text: 'Check out @nodeboot on github!',
    url: 'http://github.com/cbumgard/node-boot',
    hashtags: 'nodejs',
    original_referer: 'http://node-boot.herokuapp.com',
    source: 'tweetbutton'
  }
}

exports.logging = {
  // http://www.senchalabs.org/connect/middleware-logger.html
  express_format: '[:date] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" :remote-addr'
}

//-- Uncomment below and configure once MongoDB available:
// exports.mongodb = {
//   host: 'localhost',
//   port: 27017,
//   dbname: 'changeme',
//   opts: {}
// }

//-- Uncomment below and configure if using Passport auth strategies:
exports.passport = {
  //----------------------------
  // The name of each object below should match to a valid Passport strategy / NPM module.
  // E.g. have an object of config options below such as 'facebook: {..}' which corresponds
  // to the 'passport-facebook' NPM module. Make sure each module is in the ./package.json file.
  // For all Passport strategies, please refer to: https://github.com/jaredhanson/passport
  // The following routes will be automatically mounted for each strategy configured below:
  // /auth/<strategy≥/
  // /auth/<strategy>/callback/
  // Note: you must also create a photoUrl function that knows how to retrieve the URL to
  // the user's photo if you wish it to display in the navbar along with their display name.
  //----------------------------
  // facebook: {
  //   success_redir_url: '/auth/success',
  //   failure_redir_url: '/auth/failure',    
  //   callbackURL : 'http://localhost:8000/auth/facebook/callback',
  //   clientID: '',
  //   clientSecret: '',
  //   photoUrl: function(profile) {
  //     return 'https://graph.facebook.com/' + profile.username + '/picture?type=square&return_ssl_resources=1';
  //   }
  // },
  // twitter: {
  //   success_redir_url: '/auth/success',
  //   failure_redir_url: '/auth/failure',        
  //   callbackURL: 'http://localhost:8000/auth/twitter/callback',
  //   consumerKey: '',
  //   consumerSecret: '',
  //   photoUrl: function(profile) {
  //     return (profile.photos && profile.photos.length > 0) ? profile.photos[0].value : null;
  //   }    
  // },
  // github: {
  //   success_redir_url: '/auth/success',
  //   failure_redir_url: '/auth/failure',        
  //   callbackURL: 'http://localhost:8000/auth/github/callback',
  //   clientID: '',
  //   clientSecret: '',
  //   photoUrl: function(profile) {
  //     return (profile._json && profile._json.avatar_url) ? profile._json.avatar_url : null;
  //   }    
  // }  
}

exports.session = {
  secret: 'super 1337 hax!!11'
}

//-- socket.io integration:
exports.sockets = {
  update_interval_ms: 3000,
  log_level: 2 // 3 == debug, 2 == info, 1 == warn, 0 == error
}

exports.static_assets = {
  dir: '/public',
  max_age: 3600000 // one hour (60s * 60m * 1000ms)
}

//-- Uncomment below and configure once Redis available:
// exports.redis = {
//   session_opts: {
//     host: 'localhost',
//     port: 6379,
//     prefix: 'nb_sess:'
//   }
// }

//-- Uncomment below and configure once Gmail (or other email service) ready:
// exports.email = {
//   smtp: {
//     service: 'Gmail',
//     auth: {
//       user: 'yourname@gmail.com',
//       pass: 'password'
//     }
//   },
//   from_email: 'yourname@gmail.com',
//   admin_notifyees: ['yourname@gmail.com']
// }