var errors = module.exports = {};

errors.auth = {};

errors.auth.NOT_AUTHENTICATED = {
  type:       "auth"
, code:       "0001"
, statusCode: "401"
, name:       "NOT_AUTHENTICATED"
, message:    "You are not authenticated. Please Login."
};
errors[errors.auth.NOT_AUTHENTICATED.code] = errors.auth.NOT_AUTHENTICATED;

errors.auth.NOT_ALLOWED = {
  type:       "auth"
, code:       "0002"
, statusCode: "403"
, name:       "NOT_ALLOWED"
, message:    "You are not allowed to use this resource."
};
errors[errors.auth.NOT_ALLOWED.code] = errors.auth.NOT_ALLOWED;

errors.auth.INVALID_EMAIL = {
  type:       "auth"
, code:       "0003"
, statusCode: "401"
, name:       "INVALID_EMAIL"
, message:    "Invalid Email. Please try again."
};
errors[errors.auth.INVALID_EMAIL.code] = errors.auth.INVALID_EMAIL;

errors.auth.INVALID_PASSWORD = {
  type:       "auth"
, code:       "0004"
, statusCode: "401"
, name:       "INVALID_PASSWORD"
, message:    "Invalid Password. Please try again."
};
errors[errors.auth.INVALID_PASSWORD.code] = errors.auth.INVALID_PASSWORD;

errors.auth.UNKNOWN_OAUTH = {
  type:       "auth"
, code:       "0005"
, statusCode: "401"
, name:       "UNKNOWN_OAUTH"
, message:    "There was an unknown error in the oauth process."
};
errors[errors.auth.UNKNOWN_OAUTH.code] = errors.auth.UNKNOWN_OAUTH;

errors.auth.INVALID_ACCESS_TOKEN = {
  type:       "auth"
, code:       "0004"
, statusCode: "401"
, name:       "INVALID_ACCESS_TOKEN"
, message:    "Invalid Password. Please try again."
};
errors[errors.auth.INVALID_ACCESS_TOKEN.code] = errors.auth.INVALID_ACCESS_TOKEN;

errors.auth.INVALID_PERMISSIONS = {
  type:       "auth"
, code:       "0004"
, statusCode: "403"
, name:       "INVALID_PERMISSIONS"
, message:    "You do not have suffucient permissions to utilize this resource"
};
errors[errors.auth.INVALID_PERMISSIONS.code] = errors.auth.INVALID_PERMISSIONS;

errors.validation = {};

errors.server = {};

errors.server.INTERNAL_SERVER_ERROR = {
  type:       "server"
, code:       "0200"
, statusCode: "500"
, name:       "INTERNAL_SERVER_ERROR"
, message:    "Something bad happened and we're not sure what it was."
};
errors[errors.server.INTERNAL_SERVER_ERROR.code] = errors.server.INTERNAL_SERVER_ERROR;

for ( var group in errors ){
  for ( var name in errors[ group ] ){
    errors[ name ] = errors[ group ][ name ];
  }
}