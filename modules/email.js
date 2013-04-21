var nodemailer = require('nodemailer')
  , util = require('util')
  , config = require('../config')
  , logger = require('winston')
;

module.exports = function() {
  var smtp_transport;
  var email_configured = config.email && config.email.smtp;
  if (!email_configured) {
    logger.warn('email not configured; no smtp transport created and no emails will be sent');
  } else {
    // create reusable transport method (opens pool of SMTP connections)
    smtp_transport = nodemailer.createTransport('SMTP', config.email.smtp);
  }

  var send = function(opts, callback) {
    if (!email_configured) {
      logger.warn('email not configured; not sending message');
      callback(null, null);
      return;
    }    
    smtp_transport.sendMail(opts, callback);    
  }

  return {
    send: send
  }  
}