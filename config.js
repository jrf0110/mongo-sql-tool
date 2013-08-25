var utils = require('./lib/utils');
var config = {};

/**
 * Change configuration environment
 * @param  {String} env The environment to change to
 */
var changeEnvironment = function(env){
  if (env == null || !config.hasOwnProperty(env)) env = 'dev';

  for (var key in module.exports) delete module.exports[key];

  var _config = {};

  _config = utils.merge( utils.clone(config.default), config[env] );

  for (var key in _config) module.exports[key] = _config[key];

  module.exports.env = env;
  module.exports.changeEnvironment = changeEnvironment;
};

/**
 * Default Configuration
 * Specific environments will override defaults
 */
config.default = {

  httpPort: process.env.MONGO_SQL_TOOL_PORT || 3013

, cookieSecret: process.env.MONGO_SQL_TOOL_COOKIE_SECRET || 'default cookie secret'

, db: {
    database: 'mongo_sql_tool'
  }
};

/**
 * Test Configuration
 */
config.test = {
  
};

/**
 * Dev Configuration
 */
config.dev = {

};

/**
 * Production Configuration
 */
config.prod = {

};

module.exports = {};

// Set the initial environment
changeEnvironment( process.env.MONGO_SQL_TOOL_ENV || 'dev' );
