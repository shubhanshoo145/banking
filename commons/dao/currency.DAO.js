// const assert = require('assert');

const MODEL = rootRequire('models').Currency;
const DAO = require('./DAO'); // return constructor function.

function CurrencyDAO() {
  this.Model = MODEL;
  // this.clientId = clientId;
}

// Prototypal Inheritance
CurrencyDAO.prototype = new DAO();

module.exports = function () {
  // assert.ok(clientId, 'clientId is empty');
  return new CurrencyDAO();
};