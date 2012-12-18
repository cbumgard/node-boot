var nodemailer = require('nodemailer')
  , util = require('util')
  , config = require('../config');

module.exports = function() {

  // create reusable transport method (opens pool of SMTP connections)
  var smtp_transport = nodemailer.createTransport('SMTP', config.email.smtp);

  var to_full_email = function(user) {
    var has_display_name = user.profiles 
      && user.profiles.length > 0 
      && user.profiles[0].display_name;
    var full_email = has_display_name 
      ? user.profiles[0].display_name + ' <' + user.email + '>' 
      : user.email;
    return full_email;
  }

  var send = function(opts, callback) {
    smtp_transport.sendMail(opts, callback);    
  }

  var send_welcome_new_user = function(user, callback) {
    var subject = util.format('Welcome to %s!', 
      config.app.title);
    var message = util.format('<h1>Welcome to %s, %s!</h1>' 
      + '<p>Fork me at https://github.com/cbumgard/node-boot'
      + ' and start hacking on your own awesome project.</p>'
      + '<p>Sincerely,</p>'
      + '<p>@nodeboot</p>',
      config.app.title, user.profiles[0].display_name);
    var opts = {
      from: config.email.from,
      to: to_full_email(user),
      subject: subject,
      generateTextFromHTML: true,
      html: message
    }    
    send(opts, callback); // callback(err, res) where res.message is the sent message
  }

  var send_admin_notify_new_user = function(user, callback) {
    var subject = util.format('New %s user: %s', 
      config.app.title, to_full_email(user));
    var message = util.format('<h1>The following user has signed up' 
      + '</h1><pre><code>%s</pre></code>', 
      JSON.stringify(user));
    var opts = {
      from: config.email.from,
      to: config.email.admin_notifyees,
      subject: subject,
      generateTextFromHTML: true,
      html: message
    }    
    send(opts, callback); // callback(err, res) where res.message is the sent message
  }

  return {
    send: send,
    send_welcome_new_user: send_welcome_new_user,
    send_admin_notify_new_user: send_admin_notify_new_user
  }  
}