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
})