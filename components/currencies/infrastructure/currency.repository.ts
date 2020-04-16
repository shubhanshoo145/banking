import { injectable, inject } from 'inversify';
import { Model } from 'mongoose';

import types from '../../../constants/types';
import { ICurrencyRepository, ILeanCurrencyDocument, ICurrencyDocument } from '../currency.interfaces';

@injectable()
export class CurrencyRepository implements ICurrencyRepository {
  @inject(types.CurrencyModel) private readonly model: Model<ICurrencyDocument> ;

  public async getCurrencies(): Promise<ILeanCurrencyDocument[]>;
  public async getCurrencies(currencyCodes: string): Promise<ILeanCurrencyDocument[]>;
  public async getCurrencies(currencyCodes?: string): Promise<ILeanCurrencyDocument[]> {
    const searchQuery: any = {
      is_active: true,
    };

    if (currencyCodes) {
      searchQuery.currency_code = { $in: currencyCodes };
    }

    return await this.model.find(searchQuery).lean();
  }
}