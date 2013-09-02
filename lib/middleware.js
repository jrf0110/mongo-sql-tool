var dm      = require('dirac-middleware');
var stdm    = require('stdm');
var db      = require('./db');
var utils   = require('./utils');
var errors  = require('./errors');

var m = module.exports = utils.extend( {}, dm, stdm );

m.snippetOwner = function( field ){
  return function( req, res, next ){
    var id;

    if ( !(id = req.param(field || 'id')) )

    // Lookup the owner of the item
    db.snippets.findOne( id, function( error, result ){
      if ( error ) return res.error( 500 );

      if ( !result ) return res.error( 404 );

      // There is no owner, it's fair game
      if ( !result.owner ) return next();

      // The owner on the object did not match the authed user
      // Send back invalid read/write permissions
      if ( result.owner != req.user.name ){
        return res.error(
          errors[ 'INVALID_PERMISSIONS' ]
        );
      }

      // Everything checked out, move along
      next();
    });
  };
};