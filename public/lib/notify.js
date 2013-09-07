define(function(require){
  var notify = {
    error: function(error){
      if ( error instanceof XMLHttpRequest && error.responseText ){
        try {
          error = JSON.parse( error.responseText );
          error = error.error;
        } catch ( e ){}
      }

      var msg = error && error.message ? error.message : "Something went wrong :/";
      return alert( msg );
    }
  };

  return notify;
});