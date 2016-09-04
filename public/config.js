if (typeof module === 'object' && typeof define !== 'function') {
  var define = function (factory) {
    module.exports = factory(require, exports, module);
  };
}

define(function(require){
  return {
    editorId:             'editor'
  , resultId:             'result'
  , styleId:              'app-style'
  , sqlFormatterUrl:      'http://sqlformat.org/api/v1/format'
  , defaultSnippet:       1
  , snippetSaveInterval:  5000
  };
});