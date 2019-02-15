const { reutersRate } = require('../service');
const { redisConfig } = require('../config');

const { currencyDAO, reutersRateDAO } = require('../commons').DAO;
const constants = require('../constants');
const co = require('co');
const _ = require('lodash');
const redis = require('redis');

function* getCurrencies() {
  const _currencyDAO = currencyDAO();
  const baseQuery = {};
  return yield _currencyDAO.find({ baseQuery });
}

// function to filter reuters result array
function filterReutersResultArray(reutersResult, sourceCurrency) {
  const filteredObject = reutersResult.reduce((rateObj, val) => {
    const scalingFactor = val.Fields && val.Fields.Field[0] && val.Fields.Field[0].Utf8String ? val.Fields.Field[0].Utf8String : 1;
    const destinationCurrencyRate = val.Fields && val.Fields.Field[2] && val.Fields.Field[2].Double ? val.Fields.Field[2].Double : 0;
    const destinationCurrency = val.Fields && val.Fields.Field[3] && val.Fields.Field[3].Utf8String ? val.Fields.Field[3].Utf8String : sourceCurrency;
    const calculatedRate = parseFloat((destinationCurrencyRate / scalingFactor).toFixed(8));

    rateObj[`${sourceCurrency}${destinationCurrency}`] = {
      destinationCurrency: destinationCurrency,
      fxRate: destinationCurrency === sourceCurrency ? 1 : calculatedRate,
      sourceCurrency: sourceCurrency,
      scalingFactor: scalingFactor,
    };
    return rateObj;
  }, {});
  return filteredObject;
}

function* getReutersRate(currencies) {
  let rates = {};
  const currenciesLength = currencies.length;
  for (let i = 0; i < currenciesLength; i += 1) {
    const currencyPairArray = [];
    for (let j = 0; j < currenciesLength; j += 1) {
      const opts = {
        sourceCurrency: currencies[i].currency_label,
        destinationCurrency: currencies[j].currency_label,
      };
      const currencyPair = `${opts.sourceCurrency}${opts.destinationCurrency}`;
      const RICPAIR = constants.CURRENCY_PAIR[currencyPair] ? constants.CURRENCY_PAIR[currencyPair] : `${currencyPair}=R`;
      currencyPairArray.push({
        Name: RICPAIR,
        NameType: 'RIC',
      });
    }
    const reutersResult = yield reutersRate(currencyPairArray);
    const filteredReutersResult = filterReutersResultArray(reutersResult.ratesArray, currencies[i].currency_label);
    // merged filteredReutersResult with rates object
    rates = _.merge(rates, filteredReutersResult);
  }
  // function to adjust and modify rate due to anamoly in reuters rate
  return rates;
}

function saveRatesToRedis(rates) {
  const redisClient = process.env.NODE_ENV === 'production' ? redis.createClient(redisConfig.port, redisConfig.dbURI, {}) : redis.createClient(redisConfig.port, redisConfig.dbURI, { password: redisConfig.password });
  redisClient.on('connect', () => {
    logger.info('redis connected');
    const rate = JSON.stringify(rates);
    redisClient.set('rates', rate);
    redisClient.quit();
  });
  redisClient.on('error', (err) => {
    logger.error('Redis Error', err);
    redisClient.quit();
  });
}

function* handler() {
  try {
    const _reutersRateDAO = reutersRateDAO();
    const currencies = yield getCurrencies();
    const reutersRates = yield getReutersRate(currencies);
    const doc = {
      rates: reutersRates,
    };
    // save rates to redis client
    saveRatesToRedis(reutersRates);
    if (process.env.NODE_ENV === 'production') {
      return _reutersRateDAO.save(doc);
    }
    return true;
  } catch (e) {
    logger.error(e);
    throw e;
  }
}

function init() {
  return co(handler());
}

module.exports = {
  init,
};