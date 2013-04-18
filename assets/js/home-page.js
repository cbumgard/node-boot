/*!
 * home-page.js
 *
 * Copyright 2012 Chris Bumgardner
 * Licensed under the MIT License
 * https://github.com/cbumgard/node-boot/blob/master/LICENSE
 */

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