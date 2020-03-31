import { ICurrencyDocument, ILeanCurrencyDocument } from "../currency.interfaces";
import { ICurrency } from "../../../commons/interfaces/entities/ICurrency";
import { Currency } from "../entities/currency";

export class CurrencyMapper {
  public static toDomain(raw: ICurrencyDocument): ICurrency;
  public static toDomain(raw: ILeanCurrencyDocument): ICurrency;
  public static toDomain(raw: any): ICurrency {
    const leanDocument: ILeanCurrencyDocument = raw.toObject ?
      raw.toObject() : raw;
    
    return Currency.create({
      isoCode: leanDocument.currency_label,
      name: leanDocument.currency_name,
      active: leanDocument.is_active,
    }, leanDocument._id.toHexString());
  }
}