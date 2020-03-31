import { Router, Request, Response, NextFunction } from 'express';
import { IConfig } from 'config';
import * as moment from 'moment';

import container from '../../container';
import types from '../../constants/types';
import { ICurrencyService } from '../../commons/interfaces/services/ICurrencyService';
import { IRateService } from '../../commons/interfaces/services/IRateService';
import { ICurrencyPair } from '../../commons/interfaces/entities/ICurrencyPair';
import { CurrencyPair } from '../../components/currencies/entities/currencyPair';

export default (router: Router) => {
  router.post('/cronjobs/getRates', async (req: Request, res: Response, next: NextFunction) => {
    try {
    const currencyService = container.get<ICurrencyService>(types.CurrencyService);
    const rateService = container.get<IRateService>(types.RateService);
    const config = container.get<IConfig>(types.Config);

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

    // TODO: This seems very out of place
    rates.forEach((rate) => {
      rate.expiresAt = moment.utc().add(config.get('default.application.EXPIRY_MINUTES'), 'm').toDate();
    });

    await Promise.all([
      rateService.storeRates(rates),
      rateService.postRates(rates),
    ]);

    res.json({ success: true });
    } catch (error) {
      next(error);
    }
  });
};