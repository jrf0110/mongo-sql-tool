var utils = module.exports = {};

var lodash  = require('lodash');

utils.async = require('async');
utils.http = require('request');

lodash.extend( utils, lodash );

utils.noop = function(){};

utils.queryParams = function(data){
  if (typeof data !== "object") return "";
  var params = "?";
  for (var key in data){
    if (utils.isArray(data[key])){
      for (var i = 0, l = data[key].length; i < l; ++i){
        params += key + "[]=" + data[key][i] + "&";
      }
    } else {
      params += key + "=" + data[key] + "&";
    }
  }
  return params.substring(0, params.length - 1);
};