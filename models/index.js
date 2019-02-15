const mongoose = require('mongoose');
const bluebird = require('bluebird');

// Setting default SYSTEM PROMISE
mongoose.Promise = bluebird;

const Schema = mongoose.Schema;

// loading all the models
const ReutersRate = mongoose.model('reutersRate', require('./reutersRate.schema')(Schema));
const Currency = mongoose.model('currency', require('./currency.schema')(Schema));
// registring models
const model = {
  Currency,
  ReutersRate
};

module.exports = model;