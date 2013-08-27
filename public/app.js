require.config({
  "packages": [
    {
      "name": "ace"
    , "location": "jam/ace/lib/ace"
    , "main": "ace"
    }
  , {
      "name": "signals"
    , "location": "jam/js-signals"
    , "main": "signals.js"
    }
  ]
});

define(function(require){
  var
    ace           = require('ace')
  , utils         = require('./lib/utils')
  , initial       = require('./lib/initial')
  , config        = require('./config')
  , cssParser     = require('./lib/css-parser')

  , Modes = {
      JavaScript:   require('ace/mode/javascript').Mode
    , SQL:          require('ace/mode/sql').Mode
    }

  , app = {
      events: {}

    , routes: {
        'snippets/:snippetId':
        function( snippetId ){
          utils.http({
            url:      '/api/snippets/' + snippetId
          , method:   'get'
          , type:     'json'
          , success:  function( result ){
              if ( result.error ) return result.error( error );
console.log(result)
              app.mainEditor.setValue( result.data.content );
              app.parseResult();
              app.formatResult();
            }
          , error:    app.error
          });
        }
      }

    , init: function(){
        cssParser.parse( config.styleId );

        utils.domready(function(){
          app.mainEditor    = ace.edit( config.editorId );
          app.resultEditor  = ace.edit( config.resultId );

          app.makeEditorStandard( app.mainEditor );
          app.makeEditorStandard( app.resultEditor );

          app.mainEditor.getSession().setMode( new Modes.JavaScript() );
          app.resultEditor.getSession().setMode( new Modes.SQL() );

          app.mainEditor.commands.bindKeys({
            'command-enter': app.parseResult
          });

          app.resultEditor.commands.bindKeys({
            'command-enter': app.parseResult
          });

          app.mainEditor.commands.bindKeys({
            'command-alt-f': app.formatResult
          });

          app.resultEditor.commands.bindKeys({
            'command-alt-f': app.formatResult
          });

          app.loadInitial();

          app.initEvents();
          app.initRoutes();
        });
      }

    , loadInitial: function(){
        app.mainEditor.setValue( initial );
      }

    , initRoutes: function(){
        app.router = new utils.Router( app.routes );
        app.router.listen();
      }

    , initEvents: function(){
        for (var key in app.events){
          Array.prototype.slice.call(
            document.querySelectorAll( key.substring( i = (key.indexOf(' ') + 1) ) )
          ).forEach( function(el){
            el.addEventListener(
              key.substring( 0, i )
            , app[ app.events[ key ] ]
            );
          });
        }
      }

    , error: function(error){
        return alert( JSON.stringify(error) );
      }

    , parseResult: function(){
        if ( app.mainEditor.getValue() == '' ) return;
        app.resultEditor.setValue(
          utils.sql( eval( '(' + app.mainEditor.getValue() + ')' ) ).toString()
        );
      }

    , formatResult: function(){
        utils.formatSql( app.resultEditor.getValue(), function(error, result){
          if (error) return app.error( error );

          app.resultEditor.setValue( result );
        });
      }

    , makeEditorStandard: function(editor){
        editor.setTheme( 'ace/theme/github' );
        editor.setShowPrintMargin( false );
        editor.getSession().setTabSize( 2 );
        editor.getSession().setUseSoftTabs( true );
        editor.getSession().setUseWrapMode( false );
      }
    }
  ;

  return app;
});