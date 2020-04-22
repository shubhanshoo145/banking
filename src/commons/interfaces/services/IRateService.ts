import { IRate } from '../entities/IRate';
import { ICurrencyPair } from '../entities/ICurrencyPair';

export interface IRateService {
  getRates(currencyPairs: ICurrencyPair[]): Promise<IRate[]>;
  storeRates(rates: IRate[]): Promise<void>;
  postRates(rates: IRate[]): Promise<void>;
}