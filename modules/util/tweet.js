var util = require('util');

/*
  Takes an opt object and returns a properly encoded tweet intent url.
  Expect the following options:
    opts: {
      text: '',
      url: '',
      hashtags: '',
      original_referer: '',
      source: ''
    }
  For more documentation, refer to: https://dev.twitter.com/docs/intents
*/
exports.createTweetIntentUrl = function(opts) {
  // TODO: handle case where not all opts are specified
  var tweetUrlPattern = 'https://twitter.com/intent/tweet?hashtags=%s&original_referer=%s&source=%s&text=%s&url=%s';
  return util.format(tweetUrlPattern, 
    encodeURIComponent(opts.hashtags), 
    encodeURIComponent(opts.original_referer), 
    encodeURIComponent(opts.source), 
    encodeURIComponent(opts.text), 
    encodeURIComponent(opts.url));
}