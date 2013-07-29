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