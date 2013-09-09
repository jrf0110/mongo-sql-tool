require.config({
  "packages": [
    {
      "name": "ace"
    , "location": "jam/ace/lib/ace"
    , "main": "ace"
    }
  ]
});

define(function(require){
  var
    ace           = require('ace')
  , utils         = require('./lib/utils')
  , notify        = require('./lib/notify')
  , initial       = require('./lib/initial')
  , config        = require('./config')
  , cssParser     = require('./lib/css-parser')
  , user          = require('./lib/user')
  , snippet       = require('./lib/snippet')

  , Modes = {
      JavaScript:   require('ace/mode/javascript').Mode
    , SQL:          require('ace/mode/sql').Mode
    }

  , app = {
      events: {
        'click .btn-new':   'onBtnNewClick'
      , 'click .btn-save':  'onBtnSaveClick'
      }

    , keybindings: {
        'command-enter':  'parseResult'
      , 'command-alt-f':  'formatResult'
      , 'ctrl-n':         'newSnippet'
      , 'ctrl-s':         'onBtnSaveClick'
      }

    , routes: {
        '':
        function(){
          app.loadSnippet( config.defaultSnippet );
        }
      , 'snippets/:snippetId':
        function( snippetId ){
          app.loadSnippet( snippetId );
        }
      , 'no-header-snippets/:snippetId': {
          enter: function( snippetId ){
            utils.dom( '.app-container' ).addClass( 'no-header' );
            app.loadSnippet( snippetId );
          }
        , exit: function( snippetId ){
            utils.dom( '.app-container' ).removeClass( 'no-header' );
          }
        }
      , 'errors/:msg':
        function( msg ){
          app.error( msg );
        }
      , 'login':
        function(){
          user.auth();
        }
      , 'logout':
        function(){
          user.session.del();
          app.onUserLogout();
          app.router.navigate( config.defaultSnippet );
        }
      }

    , init: function(){
        cssParser.parse( config.styleId );

        user.fetch( function( error, result ){
          if ( error ) return app.error( error );

          if ( result ) app.onUserLogin( result );
        });

        utils.domready(function(){
          app.mainEditor    = ace.edit( config.editorId );
          app.resultEditor  = ace.edit( config.resultId );

          app.makeEditorStandard( app.mainEditor );
          app.makeEditorStandard( app.resultEditor );

          app.mainEditor.getSession().setMode( new Modes.JavaScript() );
          app.resultEditor.getSession().setMode( new Modes.SQL() );

          for ( var key in app.keybindings ){
            app.keybindings[ key ] = app[ app.keybindings[ key ] ];
          }

          app.mainEditor.commands.bindKeys( app.keybindings );
          app.resultEditor.commands.bindKeys( app.keybindings );

          app.mainEditor.on( 'change', app.updateModel );

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
              key.substring( 0, i - 1 )
            , app[ app.events[ key ] ]
            );
          });
        }
      }

    , updateModel: function(){
        snippet.set({ content: app.mainEditor.getValue() });
      }

    , error: notify.error

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

    , clearEditors: function(){
        app.mainEditor.setValue( "" );
        app.resultEditor.setValue( "" );
      }

    , saveSnippet: function( callback ){
        snippet.save( callback );
      }

    , newSnippet: function( callback ){
        snippet.fresh( function( error ){
          if ( error ) return callback ? callback( error ) : app.error( error );

          app.router.navigate( '/snippets/' + snippet.attr.id, true );
          app.clearEditors();
          if ( callback ) callback();
        });
      }

    , loadSnippet: function( snippetId, callback ){
        snippet.attr.id = snippetId;
        snippet.fetch( function( error ){
          app.mainEditor.setValue( snippet.attr.content );
          app.parseResult();
          app.formatResult();

          if ( callback ) callback( null, snippet );
        });
      }

    , onUserLogin: function( user ){
        utils.dom('.app-state-notLoggedIn').addClass('hide');
        utils.dom('.app-state-loggedIn').removeClass('hide');
      }

    , onUserLogout: function( user ){
        utils.dom('.app-state-notLoggedIn').removeClass('hide');
        utils.dom('.app-state-loggedIn').addClass('hide');
      }

    , onBtnNewClick: function( e ){
        app.newSnippet();
      }

    , onBtnSaveClick: function( e ){
        var $target = utils.dom( this instanceof Element ? this : '.btn-save'  );
        app.saveSnippet( function( error ){
          if ( error ) return notify.error( error );
          $target.text( 'Saved!' );

          setTimeout(function(){ $target.text( 'Save' ); }, 3000);
        });

      }
    }
  ;

  return app;
});