if (typeof module === 'object' && typeof define !== 'function') {
  var define = function (factory) {
    module.exports = factory(require, exports, module);
  };
}

define(function(require){
  var utils = require('./utils');
  var notify = require('./notify');
  var snippet = require('./snippet');
  var user = { attr: {} };

  user.session = {};
  user.session.get = function( callback ){
    utils.http({
      url: '/api/session'
    , method: 'get'
    , type: 'json'
    , success: function( result ){
        user.attr = result.data.user;
        if ( result.error ) return ( callback || notify.error )( result.error )
        callback( result.error, user.attr );
      }
    , error: callback || notify.error
    });
  };

  user.session.del = function( callback ){
    utils.http({
      url: '/api/session'
    , method: 'delete'
    , type: 'json'
    , success: function( result ){
        return ( callback || notify.error )( result.error )
        if ( callback ) callback();
      }
    , error: callback || notify.error
    });
  };

  user.auth = function(){
    window.location.href = "/oauth/redirect" + ( snippet.attr.id ? ('?snippet=' + snippet.attr.id) : '');
  };

  user.fetch = user.session.get;

  return user;
});