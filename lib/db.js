var dirac = require('dirac');
var config = require('../config');

dirac.init( config.db );

// Collection filenames to register with dirac
[
  'snippets'
].map( function( t ){
  return require( './collections/' + t );
}).forEach( dirac.register );

var snippetBefore = function( $query, schema, next ){
  if ( $query.where && ( /number|string/ ).test( typeof $query.where.id ) ){
    $query.where.id = parseInt( $query.where.id, 36 );
  }

  if ( $query.updates && ( /number|string/ ).test( typeof $query.updates.id ) ){
    $query.updates.id = parseInt( $query.updates.id, 36 );
  }

  if ( $query.values && ( /number|string/ ).test( typeof $query.values.id ) ){
    $query.values.id = parseInt( $query.values.id, 36 );
  }

  next();
};

var snippetAfter = function( results, $query, schema, next ){
  for ( var i = 0; i < results.length; i++ ){
    if ( !('id' in results[i]) ) continue;

    results[i].id = results[i].id.toString( 36 );
  }

  next();
};

dirac.dals.snippets.before( 'findOne', snippetBefore );
dirac.dals.snippets.before( 'find',    snippetBefore );
dirac.dals.snippets.before( 'update',  snippetBefore );
dirac.dals.snippets.before( 'insert',  snippetBefore );
dirac.dals.snippets.before( 'remove',  snippetBefore );

dirac.dals.snippets.after( 'findOne', snippetAfter );
dirac.dals.snippets.after( 'find',    snippetAfter );
dirac.dals.snippets.after( 'update',  snippetAfter );
dirac.dals.snippets.after( 'insert',  snippetAfter );
dirac.dals.snippets.after( 'remove',  snippetAfter );

dirac.sync();

module.exports = dirac.dals;