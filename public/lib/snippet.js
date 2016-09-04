if (typeof module === 'object' && typeof define !== 'function') {
  var define = function (factory) {
    module.exports = factory(require, exports, module);
  };
}

define(function(require){
  var utils     = require('./utils');
  var notify    = require('./notify');
  var snippet   = { attr: { name: "", content: "" } };
  var handlers  = {};

  snippet.set = function( obj, clean ){
    if ( clean ){
      for ( var key in snippet.attr ) delete snippet.attr[ key ];
    }

    for ( var key in obj ) snippet.attr[ key ] = obj[ key ];

    snippet.trigger( 'change', obj );
  }

  snippet.on = function( e, handler ){
    handlers[ e ] = handlers[ e ] || [];
    handlers[ e ].push( handler || function(){} );
  };

  snippet.trigger = function( e ){
    if ( !Array.isArray(handlers[e]) || handlers[e].length == 0) return;
    var args = Array.prototype.slice.call( arguments, 1 );
    handlers[e].forEach( function( fn ){
      fn.apply( snippet, args );
    });
  };

  snippet.save = function( obj, callback ){
    if ( typeof obj == 'function' ){
      callback = obj;
      obj = null;
    }

    if ( obj ) snippet.set( obj );

    utils.http({
      url:          '/api/snippets' + ( snippet.attr.id ? ('/' + snippet.attr.id) : '' )
    , method:       snippet.attr.id ? 'PUT' : 'POST'
    , type:         'json'
    , contentType:  'application/json'
    , data:         JSON.stringify(snippet.attr)
    , error:        callback ? callback : notify.error

    , success: function( result ){
        if ( callback ) callback( result.error, result.data );
      }
    }); 
  };

  snippet.fetch = function( callback ){
    utils.http({
      url:          '/api/snippets/' + snippet.attr.id
    , method:       'get'
    , type:         'json'
    , contentType:  'application/json'
    , error:        callback ? callback : notify.error

    , success:   function( result ){
        if ( result.error && callback ) return callback ? callback( result.error ) : notify.error( result.error );

        snippet.set( result.data, true );

        if ( callback ) callback( null, snippet );
      }
    });
  };

  snippet.fresh = function( callback ){
    utils.http({
      url:          '/api/snippets'
    , method:       'post'
    , type:         'json'
    , contentType:  'application/json'
    , data:         JSON.stringify({ name: "" })
    , error:        callback ? callback : notify.error

    , success:   function( result ){
        if ( result.error ) return callback ? callback( result.error ) : notify.error( result.error );

        snippet.set( result.data, true );

        if ( callback ) callback( null, snippet );
      }
    });
  };

  return snippet;
});