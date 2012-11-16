// This module loads a config file in the current working directory matching the NODE_ENV variable.
// I.e. either './development.js' or './production.js' based on the process.env.NODE_ENV variable.
// If not set, it defaults to './development.js'.
// Can load custom environment files as well, as long as the NODE_ENV variable matches
// a file in the current directory. E.g. './staging.js'
// Usage: calling code can just require this module, e.g. "var config = require('./config')"
// assuming this file is named "index.js" and lives in a subdirectory named "config" of the app root.
var config
  , config_file = './' + (process.env.NODE_ENV ? process.env.NODE_ENV : 'development') + '.js';

try {
  config = require(config_file);
} catch (err) {
  if (err.code && err.code === 'MODULE_NOT_FOUND') {
    console.error('No config file matching NODE_ENV=' + process.env.NODE_ENV 
      + '. Requires "' + __dirname + '/' + process.env.NODE_ENV + '.js"');
    process.exit(1);
  } else {
    throw err;
  }
}
module.exports = config;