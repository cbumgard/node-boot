var config = require('../config')
  , logger = require('winston')
;

module.exports = function(io, sessionSockets, listeners) {  
  // Initialize socket.io to listen for long poll client requests to update feed:
  io.set('log level', config.sockets.log_level); // 3 == debug, 2 == info, 1 == warn, 0 == error
  sessionSockets.on('connection', function (err, socket, session) {
    if (err) { 
      logger.error('socket.io error on connection: ', err); 
      return;
    }
    listeners.forEach(function(listener) {
      listener(socket, session);
    });
  });  
}