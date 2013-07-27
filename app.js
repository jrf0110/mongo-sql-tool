
/**
 * Module dependencies.
 */

var
  express = require('express')
, http    = require('http')
, path    = require('path')
, app     = express()
;

app.configure(function(){
  app.set('port', process.env.MONGO_SQL_TOOL_PORT || 3000);
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser( process.env.MONGO_SQL_TOOL_COOKIE_SECRET ));
  app.use(express.cookieSession());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());

  // Use nginx in prod
  app.use(express.static(path.join(__dirname, 'public')));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
