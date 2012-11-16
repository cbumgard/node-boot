var fs = require('fs');

exports.app = app = {
  title: 'node-boot',
  host: 'localhost', // <= Change this to reflect the domain name this site is available on.
  port: 3443, // <= process.env.PORT overrides this, for hosted environments such as Heroku. Change to 443 if hosting for SSL.
  ssl: false, // Set to true once SSL certs are available and specified below:
  // ssl_certs: {
  //   ca: fs.readFileSync('./yourdomain_gd_ca.crt'),
  //   key: fs.readFileSync('./yourdomain.key'),
  //   cert: fs.readFileSync('./yourdomain.com.crt')
  // },
  cluster: true
}

exports.logging = {
  // For more on express_format see http://www.senchalabs.org/connect/middleware-logger.html
  express_format: '[:date] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" :remote-addr',
  // Uncomment winston_mongodb to send logging to MongoDB:
  // winston_mongodb: {
  //   host: '',
  //   port: 27017,
  //   db: 'logs', // <= change this
  //   collection: 'production', // <= change this
  //   username: '',
  //   password: '',
  //   safe: false // faster - don't perform 2nd request to verify log message was received/saved
  // }  
}

//-- Uncomment below and configure once MongoDB available:
// exports.mongodb = {
//   host: '',
//   port: 27847,
//   dbname: '',
//   opts: {
//     user: '',
//     pass: ''
//   }
// }

//-- Uncomment below and configure if using Passport auth strategies:
// exports.passport = {
//   facebook_opts: {
//     callbackURL : '',
//     clientID: '',
//     clientSecret: ''
//   },
//   twitter_opts: {
//     callbackURL: '',
//     consumerKey: '',
//     consumerSecret: ''    
//   }
// }

//-- Uncomment below and configure once Redis available:
// exports.redis = {
//   session_secret: 'changeme',
//   session_opts: {
//     host: '',
//     port: 9510,
//     pass: '',
//     prefix: 'md_sess:'
//   }
// }