if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}

define(function(require, exports, module){
  var helpers = require('../../lib/query-helpers');

  helpers.register('limit', function(limit, values){
    return " limit $" + values.push(limit);
  });

  return module.exports;
});