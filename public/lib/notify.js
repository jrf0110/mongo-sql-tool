if (typeof module === 'object' && typeof define !== 'function') {
  var define = function (factory) {
    module.exports = factory(require, exports, module);
  };
}

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