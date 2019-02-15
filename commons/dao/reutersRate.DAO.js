// const assert = require('assert');

const MODEL = rootRequire('models').ReutersRate;
const DAO = require('./DAO'); // return constructor function.

function ReutersRateDAO() {
  this.Model = MODEL;
  // this.clientId = clientId;
}

// Prototypal Inheritance
ReutersRateDAO.prototype = new DAO();

module.exports = function () {
  // assert.ok(clientId, 'clientId is empty');
  return new ReutersRateDAO();
};