if (typeof module === 'object' && typeof define !== 'function') {
  var define = function (factory) {
    module.exports = factory(require, exports, module);
  };
}

define(function(require){
  var
    http        = require('reqwest')
  , mosql       = require('mongo-sql')
  , PaperBoy    = require('paper-boy')
  , dom         = require('jquery')
  , formatter   = require('./sql-formatter')
  , utils       = {}
  ;

  utils.dom       = dom;
  utils.domready  = dom;
  utils.sql       = mosql.sql;
  utils.http      = http;
  utils.formatSql = formatter.format;
  utils.Router    = PaperBoy;

  return utils;
});