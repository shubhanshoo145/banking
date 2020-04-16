import { ICurrency } from './ICurrency';

export interface ICurrencyPair {
  sourceCurrency: ICurrency;
  destinationCurrency: ICurrency;
  reutersInstrumentCode: { Name: string, NameType: string };
}