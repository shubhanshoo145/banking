const { ipAuthentication, authorization, basic } = require('../middleware');
const router = require('express').Router();

basic(router);

// Insecure routes
require('./healthcheck')(router);

ipAuthentication(router);
authorization(router);

// secured components
require('./rates')(router);
require('./reuterRates')(router);



/**
 * Mounting respective paths.
 * @param {object} app Express instance
 */
module.exports = function (app) {
  app.use('/reuters/api/v1', router);
};