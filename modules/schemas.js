var mongoose = require('mongoose')
  , email = require('./email')()
  , logger = require('winston')
;

var User = exports.User = mongoose.Schema({
  email: String,
  created: Date,
  provider_id: String,
  username: String,
  display_name: String,
  photo_url: String,
  provider: String // e.g. "github"
});
User.index({ 'email': 1 });
User.index({ 'created': 1 });
User.index({ 'provider_id': 1 }); // For lookup by oauth account (e.g. GitHub) ID during login
User.index({ 'provider': 1}); // For lookup by oauth account (e.g. GitHub) - to match provider with ID
User.post('save', function (user) {
  email.send_welcome_new_user(user, function(err, res) {
    if (err) { 
      logger.error('problem sending new user welcome email', err); 
    }
    if (res && res.message) { 
      logger.info('sent welcome email to new user: ' + res.message); 
    }
  });
  email.send_admin_notify_new_user(user, function(err, res) {
    if (err) { 
      logger.error('problem sending new user admin notification email', err); 
    }
    if (res && res.message) { 
      logger.info('sent admin notification email about new user: ' + res.message); 
    }
  });  
})