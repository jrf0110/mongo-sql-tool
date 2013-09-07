define(function(require){
  var
    domready    = require('domReady')
  , http        = require('reqwest')
  , mosql       = require('mongo-sql')
  , PaperBoy    = require('paper-boy')
  , dom         = require('jquery')
  , formatter   = require('./sql-formatter')
  , utils       = {}
  ;

  utils.dom       = dom;
  utils.sql       = mosql.sql;
  utils.domready  = domready;
  utils.http      = http;
  utils.formatSql = formatter.format;
  utils.Router    = PaperBoy;

  return utils;
});