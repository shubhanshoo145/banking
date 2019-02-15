const co = require('co');
const redis = require('redis');
const { redisConfig } = require('../config');

function getRates() {
  return new Promise((resolve, reject) => {
    const redisClient = process.env.NODE_ENV === 'production' ? redis.createClient(redisConfig.port, redisConfig.dbURI, {}) : redis.createClient(redisConfig.port, redisConfig.dbURI, { password: redisConfig.password });
    redisClient.on('connect', () => {
      logger.info('redis connected');
      redisClient.get('rates', (err, obj) => {
        redisClient.quit();
        if (err) return reject(err);
        if (obj) {
          return resolve(JSON.parse(obj));
        }
        return resolve({}); // return empty if rates are not found
      });
    });
    redisClient.on('error', (err) => {
      logger.error('Redis Error', err);
      redisClient.quit();
      reject(err);
    });
  });
}

function* handler(req, res) {
  try {
    const rates = yield getRates();
    const response = {};
    const currencyPairArray = req.body.currencyPairs && req.body.currencyPairs instanceof Array ?
    req.body.currencyPairs : [];
    if (currencyPairArray.length === 0) return res.json({ success: true, rates: rates });
    /** extracting rates for just the pairs in req array */
    currencyPairArray.forEach(element => {
      response[element] = rates[element];
    });
    return res.json({ success: true, rates: response });
  } catch (e) {
    logger.error(e);
    throw e;
  }
}

function redisRates(req, res) {
  return co(handler(req, res))
            .catch(err => next(err));;
}

module.exports = (router) => {
  router.post('/reuter-rates', redisRates);
};