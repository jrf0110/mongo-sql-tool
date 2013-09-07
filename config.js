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

, github: {
    // Url for github oauth
    oauthUrl:       'https://github.com/login/oauth/authorize'

    // URL to exchange code for access token
  , accessTokenUrl: 'https://github.com/login/oauth/access_token'

    // URL to get user profile and ensure user is correct user
  , userProfileUrl: 'https://api.github.com/user'

    // What we need from the user
  , scopes:         ['user']

  , redirectUri:    'http://localhost:3000/oauth'

    // The goods
  , clientId:       process.env['MOSQL_TOOL_GITHUB_CLIENT_ID']
  , clientSecret:   process.env['MOSQL_TOOL_GITHUB_CLIENT_SECRET']
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
