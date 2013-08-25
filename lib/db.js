var dirac = require('dirac');
var config = require('../config');

dirac.init( config.db );

// Collection filenames to register with dirac
[
  'snippets'
].map( function( t ){
  return require( './collections/' + t );
}).forEach( dirac.register );

dirac.sync();

module.exports = dirac.dals;