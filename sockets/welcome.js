var config = require('../config');

module.exports = function(socket, session) {
  setInterval(function() {
    var logged_in = session.passport && session.passport.user;
    if (logged_in && !session.shown_post_login_msg) {
      session.shown_post_login_msg = true;
      socket.emit('welcome', {
        'logged_in': true,
        'msg': 'Welcome ' + session.passport.user.display_name + '! Thanks for signing in.'
      });
    } else if (!logged_in && !session.shown_pre_login_msg) {
      session.shown_pre_login_msg = true;
      socket.emit('welcome', {
        'logged_in': false,
        'msg': 'Welcome to node-boot! Socket.io is working. Please sign in to see more :)'
      });
    }      
  }, config.sockets.update_interval_ms);  
}