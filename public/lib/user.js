define(function(require){
  var utils = require('./utils');
  var user = {};

  user.session = {};
  user.session.get = function( callback ){
    utils.http({
      url: '/api/session'
    , method: 'get'
    , type: 'json'
    , success: function( result ){
        callback( result.error, result.data );
      }
    , error: callback
    });
  };

  user.session.del = function( callback ){
    utils.http({
      url: '/api/session'
    , method: 'delete'
    , type: 'json'
    , success: function( result ){
        callback( result ? result.error || null );
      }
    , error: callback
    });
  };

  return user;
});