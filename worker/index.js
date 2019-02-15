 const CronJob = require('cron').CronJob;
 const getReutersRate = require('./reutersRateEnrich');
 const NODE_ENV = process.env.NODE_ENV || 'development';
 let firsttime = true;

 function init() {
   let JOBFREQUENCY = '0 0 1 1 * *';
   if (NODE_ENV === 'production') {
     JOBFREQUENCY = '0 */15 * * * *'; // every 15 mins
   }
   if (NODE_ENV === 'test') {
     JOBFREQUENCY = '0 0,30 * * * *'; // At minute 0 and 30 min.
   }
   if (NODE_ENV === 'development') {
     JOBFREQUENCY = '0 0 1 1 * *'; // at 1 of month
   }

   const job = new CronJob({
     cronTime: JOBFREQUENCY,
     onTick: function () {
       getReutersRate.init().then((data) => {
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
     getReutersRate.init().then((data) => {
       logger.info('getting rates from reuters first time');
     }).catch((err) => {
       logger.error(err);
     });
   }
 }
 module.exports = {
   init,
 };