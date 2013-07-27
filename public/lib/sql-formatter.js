define(function(require){
  var
    http = require('reqwest')
  , config = require('../config')
  , sqlFormatter = {}
  ;

  sqlFormatter.format = function(str, callback){
    http({
      url: config.sqlFormatterUrl
    , method: 'get'
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