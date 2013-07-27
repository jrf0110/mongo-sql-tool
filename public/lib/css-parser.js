define(function(require){
  var regs = {
    getVariables: /@.*:.*;/g
  };
  
  return {
    parse: function(styleId){
      var sheet = document.getElementById( styleId );
      var css = sheet.innerHTML;
      var variables = {};

      sheet.innerHTML.match( regs.getVariables ).forEach(function(v){
        var key = v.substring( 1, v.indexOf( ':' ) );
        var val = v.substring( v.indexOf( ':' ) + 1, v.length - 1 ).trim();

        // Cache vars for laters
        variables[ key ] = val;

        css = css.replace( new RegExp( '@' + key, 'g'), val );
      });

      sheet.innerHTML = css;
    }
  };
});