import { Router, Request, Response, NextFunction } from 'express';

import types from '../../constants/types';
import container from '../../container';
import { ICurrencyService } from '../../commons/interfaces/services/ICurrencyService';
import { IRateService } from '../../commons/interfaces/services/IRateService';
import { CurrencyPair } from '../../components/currencies/entities/currencyPair';

/**
 * If anyone ever improves this, this is what needs to be done:
 * - Validation should probably be done in the middleware
 * - The entire mapping & conversion logic can be handled way better
 * - Plus it does seem that the handler is kind of too big
 * - Experiment with rewriting handlers as classes (1 handler per class)
 */

export default (router: Router) => {
  router.post('/rates', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currencyService = container.get<ICurrencyService>(types.CurrencyService);
      const rateService = container.get<IRateService>(types.RateService);

      const body: { 
        currencyPairs: Array<{
          sourceCurrency: string,
          destinationCurrency: string
        }>
      } = req.body;

      if (!body?.currencyPairs || !body?.currencyPairs.length) {
        return res.json({
          success: false,
          message: 'Please send currency pairs in format - [{sourceCurrency:USD,destinationCurrency:EUR}]',
        });
      }

      const uniqueCurrencies = body?.currencyPairs.reduce((uniqueCurrencies, currencyPair) => {
        uniqueCurrencies.add(currencyPair.sourceCurrency);
        uniqueCurrencies.add(currencyPair.destinationCurrency);
        return uniqueCurrencies;
      }, new Set<string>());

      const currencies = await currencyService.getCurrencies([...uniqueCurrencies]);
      const currencyPairs = body.currencyPairs.map((currencyPair) => {
        return CurrencyPair.create({
          sourceCurrency: currencies.find(currency => currency.isoCode === currencyPair.sourceCurrency),
          destinationCurrency: currencies.find(currency => currency.isoCode === currencyPair.destinationCurrency),
        });
      });
      const rates = await rateService.getRates(currencyPairs);

      res.json({
        success: true,
        rates: rates.map((rate) => {
          const serializedRate = rate.serialize();
          return {
            sourceCurrency: serializedRate.source_currency,
            destinationCurrency: serializedRate.destination_currency,
            fxRate: serializedRate.fx_rate,
          };
        })
      });
    } catch (error) {
      next(error);
    }
  });
};