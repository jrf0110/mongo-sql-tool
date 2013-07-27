define(function(require){
  var
    utils = require('./utils')
  , config = require('../config')
  , sqlFormatter = {}
  ;

  sqlFormatter.format = function(str, callback){
    utils.http({
      url: config.sqlFormatterUrl
    , method: 'get'
    , type: 'json'

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