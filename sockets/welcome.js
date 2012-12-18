var config = require('../config');

module.exports = function(socket, session) {
  var shown_pre_login_msg = false
    , shown_post_login_msg = false;
  setInterval(function() {
    var logged_in = session.passport && session.passport.user;
    if (logged_in && !shown_post_login_msg) {
      shown_post_login_msg = true;
      socket.emit('welcome', {
        'logged_in': true,
        'msg': 'Welcome ' + session.passport.user.display_name + '! Thanks for signing in.'
      });
    } else if (!logged_in && !shown_pre_login_msg) {
      shown_pre_login_msg = true;
      socket.emit('welcome', {
        'logged_in': false,
        'msg': 'Welcome to node-boot! Socket.io is working. Please sign in to see more :)'
      });
    }      
  }, config.sockets.update_interval_ms);  
}