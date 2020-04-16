import { CurrencyPair } from "../entities/currencyPair";
import { ICurrency } from "../../../commons/interfaces/entities/ICurrency";
import { ICurrencyPair } from "../../../commons/interfaces/entities/ICurrencyPair";

export class CurrencyPairMapper {
  public static toDomain(sourceCurrency: ICurrency, destinationCurrency: ICurrency): ICurrencyPair {
    return CurrencyPair.create({
      sourceCurrency,
      destinationCurrency,
    });
  }
}