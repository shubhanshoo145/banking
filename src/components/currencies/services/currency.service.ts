import { injectable, inject } from "inversify";

import types from "../../../constants/types";
import { ICurrencyRepository } from "../currency.interfaces";
import { ICurrency } from "../../../commons/interfaces/entities/ICurrency";
import { CurrencyMapper } from "../infrastructure/currency.mapper";
import { ICurrencyService } from "../../../commons/interfaces/services/ICurrencyService";

@injectable()
export class CurrencyService implements ICurrencyService {
  @inject(types.CurrencyRepository) private readonly currencyRepository: ICurrencyRepository;

  public async getCurrencies(): Promise<ICurrency[]>;
  public async getCurrencies(currencyCodes: string[]): Promise<ICurrency[]>;
  public async getCurrencies(currencyCodes?: string[]): Promise<ICurrency[]> {
    const currencies = await this.currencyRepository.getCurrencies(currencyCodes);
    return currencies.map(currency => CurrencyMapper.toDomain(currency));
  }
}