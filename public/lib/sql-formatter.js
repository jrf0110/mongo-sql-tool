if (typeof module === 'object' && typeof define !== 'function') {
  var define = function (factory) {
    module.exports = factory(require, exports, module);
  };
}

define(function(require){
  var
    http = require('reqwest')
  , config = require('../config')
  , sqlFormatter = {}
  ;

  sqlFormatter.format = function(str, callback){
    // Stupid stupidness to fix create table
    if (str.indexOf('create table') > -1){
      return callback(null, str.substring(0, str.indexOf('(') + 1) + '\n  ' + str.substring(str.indexOf('(') + 1, str.length - 1).split(', ').join(',\n  ') + '\n' + ')');
    }

    http({
      url: config.sqlFormatterUrl
    , method: 'post'
    , type: 'jsonp'

    , data: {
        sql: str
      , reindent: 1
      }

    , success: function(result){
        callback && callback( result.error, result.result );
      }

    , error: function(error){
        callback && callback( error );
      }
    });
  };

  return sqlFormatter;
});