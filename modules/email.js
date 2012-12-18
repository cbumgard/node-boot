var nodemailer = require('nodemailer')
  , util = require('util')
  , config = require('../config');

module.exports = function() {

  // create reusable transport method (opens pool of SMTP connections)
  var smtp_transport = nodemailer.createTransport('SMTP', config.email.smtp);

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
      config.app.title, user.display_name);
    var opts = {
      from: config.email.from,
      to: user.email,
      subject: subject,
      generateTextFromHTML: true,
      html: message
    }    
    send(opts, callback); // callback(err, res) where res.message is the sent message
  }

  var send_admin_notify_new_user = function(user, callback) {
    var subject = util.format('New %s user: %s', 
      config.app.title, user.email);
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