var utils = module.exports = {};

var lodash  = require('lodash');

utils.async = require('async');

lodash.extend( utils, lodash );

utils.noop = function(){};