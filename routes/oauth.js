var
  config  = require('../config')
, utils   = require('../lib/utils')
, errors  = require('../lib/errors')
;

module.exports.redirect = function(req, res){
  res.redirect(
    config.github.oauthUrl
  + '?client_id='
  + config.github.clientId
  + '&scope='
  + config.github.scopes.join(',')
  + '&redirect_uri='
  + config.github.redirectUri
  + ( req.param('snippet') ?
    ('?snippet=' + req.param('snippet')) : '' )
  );
};

module.exports.auth = function(req, res){
  var doneUrl = req.param('snippet') ? ('/#/snippets/' + req.param('snippet')) : '/';
  if ( req.session && req.session.user ){
    return res.redirect( doneUrl );
  }

  var options = {
    url: config.github.accessTokenUrl + utils.queryParams({
      code:           req.param('code')
    , client_id:      config.github.clientId
    , client_secret:  config.github.clientSecret
    })

  , method: 'POST'

  , json: true

  , headers: {
      'User-Agent': 'MoSQL-Tool'
    }
  };

  // Get access token
  utils.http(options, function(error, response, body){
    if (error)
      return res.redirect('/#/error/' + errors.auth.UNKNOWN_OAUTH.message);

    if (!body.access_token)
      return res.redirect('/#/error/' + errors.auth.UNKNOWN_OAUTH.message);

    var url = config.github.userProfileUrl + '?access_token=' + body.access_token;
    var accessToken = body.access_token;

    options.url = url;
    options.method = 'GET';
    delete options.json;

    // Get user profile
    utils.http(options, function(error, response, body){
      if (error)
        return res.redirect('/#/error/' + errors.auth.INVALID_ACCESS_TOKEN.message);

      body = JSON.parse(body);

      req.session.user = body;
      req.session.user.accessToken = accessToken;

      res.redirect( doneUrl );
    });
  });
};