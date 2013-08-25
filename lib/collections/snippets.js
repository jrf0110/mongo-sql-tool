module.exports = {
  name: 'snippets'
, schema: {
    id:       { type: 'serial', primaryKey: true }
  , name:     { type: 'text' }
  , content:  { type: 'text' }
  }
};