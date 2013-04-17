$(document).ready(function() {
  var socket = io.connect(window.location.href);
  socket.on('welcome', function(data) {
    if (data.logged_in) {
      flash('success', data.msg); // Successful login
      window.setTimeout(function() { hideFlash('success'); }, 5000);
    } else {
      flash('info', data.msg); // Informative message
      window.setTimeout(function() { hideFlash('info'); }, 5000);
    }
  });
});