
/**
 * Module dependencies.
 */

var
  express = require('express')
, http    = require('http')
, path    = require('path')
, app     = express()
, m       = require('./lib/middleware')
, routes  = require('./routes')
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
  app.use(m.error());
  app.use(m.dirac());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());

  // Use nginx in prod
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get( '/oauth/redirect'
, routes.oauth.redirect
);

app.get( '/oauth'
, routes.oauth.auth
);

app.get( '/api/session'
, routes.session.get
);

app.del( '/api/session'
, routes.session.del
);

app.get( '/api/snippets'
, m.pagination( 30 )
, m.sort( '-id' )
, m.find( db.snippets )
);

app.post('/api/snippets'
, m.insert( db.snippets )
);

app.get( '/api/snippets/:id'
, m.param( 'id' )
, m.findOne( db.snippets )
);

app.put( '/api/snippets/:id'
, m.snippetOwner( 'id' )
, m.param( 'id' )
, m.update( db.snippets )
);

app.del( '/api/snippets/:id'
, m.snippetOwner( 'id' )
, m.param( 'id' )
, m.remove( db.snippets )
);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
