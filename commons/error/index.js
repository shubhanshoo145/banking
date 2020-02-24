const ValidationError = require('./validation.Error');
const ApplicationError = require('./application.Error');
const AuthorizationError = require('./authorization.Error');
const RemoteCallError = require('./remoteCall.Error');
const RemoteRequestTimeOut = require('./remoteRequestTimeOut.Error');
const RemoteServiceNotFound = require('./remoteServiceNotFound.Error');
const IpDeniedError = require('./IpDeniedError.Error');

module.exports = {
  ValidationError,
  ApplicationError,
  AuthorizationError,
  RemoteCallError,
  RemoteRequestTimeOut,
  RemoteServiceNotFound,
  IpDeniedError,
};