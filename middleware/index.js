const ipAuthentication = require('./ipAuthentication.middleware');
const authorization = require('./authorization.middleware');
const basic = require('./basic.middleware');

module.exports = {
  ipAuthentication,
  authorization,
  basic,
};