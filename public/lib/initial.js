if (typeof module === 'object' && typeof define !== 'function') {
  var define = function (factory) {
    module.exports = factory(require, exports, module);
  };
}

define(function(require){

  return (
    [ '/**'
    , ' * Compile: Command+Enter'
    , ' * Format:  Command+Alt+F'
    , ' */'
    ].join('\n') + '\n\n'

  + JSON.stringify({
      type:  'select'
    , table: 'users'
    }, true, '  ')
  );
});