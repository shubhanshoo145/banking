import { Router, Request, Response, NextFunction } from 'express';

import container from '../../container';
import types from '../../constants/types';
import { ICurrencyService } from '../../commons/interfaces/services/ICurrencyService';
import { IRateService } from '../../commons/interfaces/services/IRateService';
import { ICurrencyPair } from '../../commons/interfaces/entities/ICurrencyPair';
import { CurrencyPair } from '../../components/currencies/entities/currencyPair';
import { ILoggerService } from '../../commons/interfaces/services/ILoggerService';

export default (router: Router) => {
  router.post('/cronjobs/getRates', async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ success: true });

      const currencyService = container.get<ICurrencyService>(types.CurrencyService);
      const rateService = container.get<IRateService>(types.RateService);
      const loggerService = container.get<ILoggerService>(types.LoggerService);

      loggerService.info('Starting cronjob');

      const currencies = await currencyService.getCurrencies();
      const currencyPairs: ICurrencyPair[] = [];
      currencies.forEach((sourceCurrency) => {
        currencies.forEach((destinationCurrency) => {
          currencyPairs.push(
            CurrencyPair.create({ sourceCurrency, destinationCurrency })
          );
        });
      });
      const rates = await rateService.getRates(currencyPairs);

      await Promise.all([
        rateService.storeRates(rates),
        rateService.postRates(rates),
      ]);

      loggerService.info('Finished executing cronjob');
    } catch (error) {
      next(error);
    }
  });
};