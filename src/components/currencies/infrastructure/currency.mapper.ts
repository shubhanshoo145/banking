import { ICurrencyDocument, ILeanCurrencyDocument } from "../currency.interfaces";
import { ICurrency } from "../../../commons/interfaces/entities/ICurrency";
import { Currency } from "../entities/currency";

export class CurrencyMapper {
  public static toDomain(raw: ICurrencyDocument): ICurrency;
  public static toDomain(raw: ILeanCurrencyDocument): ICurrency;
  public static toDomain(raw: ICurrencyDocument | ILeanCurrencyDocument): ICurrency {   
    return Currency.create({
      isoCode: raw.currency_label,
      name: raw.currency_name,
      active: raw.is_active,
    }, raw._id.toHexString());
  }
}