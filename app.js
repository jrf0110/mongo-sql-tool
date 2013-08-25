
/**
 * Module dependencies.
 */

var
  express = require('express')
, http    = require('http')
, path    = require('path')
, dm      = require('dirac-middleware')
, app     = express()
, db      = require('./lib/db')
, config  = require('./config')
;

app.configure(function(){
  app.set('port', process.env.MONGO_SQL_TOOL_PORT || 3000);
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser( config.cookieSecret ));
  app.use(express.cookieSession());
  app.use(dm.queryObj());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());

  // Use nginx in prod
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get( '/api/snippets'
, dm.pagination( 30 )
, dm.sort( '-id' )
, dm.find( db.snippets )
);

app.post( '/api/snippets'
, dm.insert( db.snippets )
);

app.get( '/api/snippets/:snippetId'
, dm.param( 'snippetId' )
, dm.findOne( db.snippets )
);

app.put( '/api/snippets/:snippetId'
, dm.param( 'snippetId' )
, dm.update( db.snippets )
);

app.del( '/api/snippets/:snippetId'
, dm.param( 'snippetId' )
, dm.remove( db.snippets )
);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
