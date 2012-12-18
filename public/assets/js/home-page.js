$(document).ready(function() {
  var socket = io.connect(window.location.href);
  socket.on('welcome', function(data) {
    if (data.logged_in) {
      flash('success', data.msg); // Successful login
    } else {
      flash('info', data.msg); // Informative message
    }
  });
});