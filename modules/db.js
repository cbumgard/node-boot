var config = require('../config')
  , mongoose = require('mongoose')
  , schemas = require('./schemas')
  , _ = require('underscore')
  , logger = require('winston')
;

exports.models = models = {};

if (config.mongodb) {
  exports.conn = conn = mongoose.createConnection(
    config.mongodb.host, config.mongodb.dbname, config.mongodb.port, config.mongodb.opts);

  conn.on('error', function(err) {
    logger.error('mongoose error: ' + err);
  });

  conn.once('open', function() {
    logger.info('MongoDB connection opened on ' 
      + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.dbname);
    // Initialize models dynamically based on the schemas object:
    _.each(schemas, function(schema, model_name) {
      logger.info('Initializing Mongoose model from schema: ' + model_name);
      models[model_name] = conn.model(model_name, schema);
    });  
  });
} else {
  logger.warn('MongoDB not configured. Schemas/models not available. See config.mongodb');
}