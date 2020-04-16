import { Document } from 'mongoose';
import { ICurrency } from '../../commons/interfaces/entities/ICurrency';

export interface ICurrencyDocument extends ILeanCurrencyDocument, Document {

}

export interface ILeanCurrencyDocument {
  _id: any;
  currency_label: string;
  currency_name: string;
  is_active: boolean;
}

export interface ICurrencyRepository {
  getCurrencies(): Promise<ILeanCurrencyDocument[]>;
  getCurrencies(currencyCodes: string[]): Promise<ILeanCurrencyDocument[]>;
}

export interface ICurrencyProps {
  isoCode: string;
  name: string;
  active: boolean;
}

export interface ICurrencyPairProps {
  sourceCurrency: ICurrency;
  destinationCurrency: ICurrency;
}