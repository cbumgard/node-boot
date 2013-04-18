/*!
 * signup.js
 *
 * Copyright 2012 Chris Bumgardner
 * Licensed under the MIT License
 * https://github.com/cbumgard/node-boot/blob/master/LICENSE
 */

$(document).ready(function() {
  // Put the user's focus directly into the code share input:
  $('input#inputEmail').focus();
  // Prepare this form for validation:
  $('form#signup-form').validate();  
});