import { IRate } from "../../../commons/interfaces/entities/IRate";
import { IReutersResponseItem } from "../rate.interfaces";
import { ICurrencyPair } from "../../../commons/interfaces/entities/ICurrencyPair";
import { Rate } from "../entities/rate";

export class RateMapper {
  public static toDomain(raw: IReutersResponseItem, currencyPair: ICurrencyPair): IRate {
    return Rate.create({
      currencyPair,
      fxRate: RateMapper.getCalculatedRate(raw, currencyPair),
      scalingFactor: Number.parseFloat(raw.Fields?.Field?.find(field => field.Name === 'SCALING')?.Utf8String) || 1,
    });
  }

  private static getCalculatedRate(raw: IReutersResponseItem, currencyPair: ICurrencyPair): number {
    if (currencyPair.sourceCurrency.isoCode !== currencyPair.destinationCurrency.isoCode) {
      const rawRate = raw.Fields.Field.find(field => field.Name === 'CF_LAST').Double;
      const rawScalingFactor = Number.parseFloat(raw.Fields.Field.find(field => field.Name === 'SCALING').Utf8String);
      
      return Number.parseFloat((rawRate / rawScalingFactor).toFixed(8));
    }
    return 1;
  }
}