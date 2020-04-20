import { ICurrency } from "../entities/ICurrency";

export interface ICurrencyService {
  getCurrencies(): Promise<ICurrency[]>;
  getCurrencies(currencyCodes: string[]): Promise<ICurrency[]>;
}