const CronJob = require('cron').CronJob;
const getReutersRate = require('./reutersRateEnrich');
const constants = require('../constants');

let firsttime = true;

function init() {
  const job = new CronJob({
    cronTime: constants.CRON_TIME,
    onTick: function () {
      getReutersRate.init().then(() => {
        logger.info('GET REUTERS RATE CRON STARTED');
      }).catch((err) => {
        logger.error(err);
      });
    },
    start: true,
  });
  job.start();
  if (firsttime) {
    firsttime = false;
    getReutersRate.init().then(() => {
      logger.info('getting rates from reuters first time');
    }).catch((err) => {
      logger.error(err);
    });
  }
}

module.exports = {
  init,
};