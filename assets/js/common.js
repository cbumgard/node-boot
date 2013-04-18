/*!
 * common.js
 *
 * Copyright 2012 Chris Bumgardner
 * Licensed under the MIT License
 * https://github.com/cbumgard/node-boot/blob/master/LICENSE
 */

$(document).ready(function() {  
  $('a.scrollto').bind('click', function(e) {
    e.preventDefault();
    target = this.hash;
    // this offset should almost match the data-offset set on the body.
    // however 5 pixels are added when scrolling to fix issue where the scrollspy
    // was off by a few pixels when scrolling back up. could be due to the size
    // of the navbar being larger than bootstrap expects due to the user photo.
    $.scrollTo(target, 500, {offset:-70}); 
  });   

  // Hide any server generated alerts after certain amount of time:
  window.setTimeout(function() { 
    $('.alert[id^=flash-server]').hide('slow') 
  }, 10000); // 10 seconds then poof
})

/**
 * Show a client-generated alert
 * @param level   {String} One of ['info', 'success', 'warn', 'error']
 * @param content {String} Replaces the .content div with this message. Can contain HTML.
 */
var flash = function(level, content) {
  var alert = $('#flash-client-' + level);
  $('.content', alert).replaceWith(content);
  $(alert).show('slow');  
}

/**
 * Hide a client-generated alert
 * @param level   {String} One of ['info', 'success', 'warn', 'error']
 */
var hideFlash = function(level) {
  var alert = $('#flash-client-' + level);  
  $(alert).hide('slow');   
}