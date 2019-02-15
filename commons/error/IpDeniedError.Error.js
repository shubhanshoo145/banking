// multilevel Error handling

function IpDeniedError(message) {
  this.name = 'IpDeniedError';
  this.message = message;
}

IpDeniedError.prototype = new Error();

module.exports = IpDeniedError;