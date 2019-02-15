const { reutersRate } = require('../service');
const constants = require('../constants');
const co = require('co');

// function to filter reuters result array
function filterReutersResultArray(reutersResult) {
  const filteredObject = reutersResult.reduce((rateObj, val) => {
    const sourceCurrency = val.RequestKey && val.RequestKey.Name ? (val.RequestKey.Name).substr(0, 3) : '';
    const scalingFactor = val.Fields && val.Fields.Field[0] && val.Fields.Field[0].Utf8String ? val.Fields.Field[0].Utf8String : 1;
    const destinationCurrencyRate = val.Fields && val.Fields.Field[1] && val.Fields.Field[1].Double ? val.Fields.Field[1].Double : 0;
    const destinationCurrency = val.Fields && val.Fields.Field[3] && val.Fields.Field[3].Utf8String ? val.Fields.Field[3].Utf8String : sourceCurrency;
    const calculatedRate = parseFloat((destinationCurrencyRate / scalingFactor).toFixed(8));

    rateObj.push({
      destinationCurrency: destinationCurrency,
      fxRate: calculatedRate,
      sourceCurrency: sourceCurrency === destinationCurrency ? 'USD' : sourceCurrency,
    });
    return rateObj;
  }, []);
  return filteredObject;
}

function* getReutersRate(currencies) {
  const currenciesLength = currencies.length;
  const currencyPairArray = [];
  for (let i = 0; i < currenciesLength; i += 1) {
    const opts = {
      sourceCurrency: currencies[i].sourceCurrency ? currencies[i].sourceCurrency : 'USD',
      destinationCurrency: currencies[i].destinationCurrency ? currencies[i].destinationCurrency : 'USD',
    };
    const currencyPair = `${opts.sourceCurrency}${opts.destinationCurrency}`;
    const RICPAIR = constants.CURRENCY_PAIR[currencyPair] ? constants.CURRENCY_PAIR[currencyPair] : `${currencyPair}=R`;
    currencyPairArray.push({
      Name: RICPAIR,
      NameType: 'RIC',
    });
  }
  const reutersResult = yield reutersRate(currencyPairArray);
  const filteredReutersResult = filterReutersResultArray(reutersResult.ratesArray);
  return filteredReutersResult;
}

function* handler(req, res) {
  try {
    const currencyPairArray = req.body && req.body.currencyPairs ? req.body.currencyPairs : [];
    if (!currencyPairArray.length) return res.json({ success: false, message: 'Please send currency pairs in format - [{sourceCurrency:USD,destinationCurrency:EUR}]' });
    const reutersRates = yield getReutersRate(currencyPairArray);
    return res.json({ success: true, rates: reutersRates });
  } catch (e) {
    logger.error(e);
    throw e;
  }
}

function rates(req, res) {
  return co(handler(req, res));
}

module.exports = (router) => {
  router.post('/rates', rates);
};