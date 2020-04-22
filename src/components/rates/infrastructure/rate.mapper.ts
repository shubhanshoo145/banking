import * as moment from 'moment';
import { IConfig } from 'config';

import types from '../../../constants/types';
import container from '../../../container';
import { IRate } from "../../../commons/interfaces/entities/IRate";
import { IReutersResponseItem } from "../rate.interfaces";
import { ICurrencyPair } from "../../../commons/interfaces/entities/ICurrencyPair";
import { Rate } from "../entities/rate";
import { IApplicationConfig } from '../../../commons/interfaces/config/IApplicationConfig';

export class RateMapper {
  public static toDomain(raw: IReutersResponseItem, currencyPair: ICurrencyPair): IRate {
    const applicationConfig: IApplicationConfig = (
      container.get<IConfig>(types.Config)
    ).get('default.application');

    return Rate.create({
      currencyPair,
      fxRate: RateMapper.getCalculatedRate(raw, currencyPair),
      scalingFactor: Number.parseFloat(raw.Fields?.Field?.find(field => field.Name === 'SCALING')?.Utf8String) || 1,
      expiresAt: moment.utc().add(applicationConfig.EXPIRY_MINUTES, 'm').toDate(),
    });
  }

  private static getCalculatedRate(raw: IReutersResponseItem, currencyPair: ICurrencyPair): number {
    if (currencyPair.sourceCurrency.isoCode !== currencyPair.destinationCurrency.isoCode) {
      const rawRate = raw?.Fields?.Field.find(field => field.Name === 'CF_LAST').Double || undefined;
      const rawScalingFactor = Number.parseFloat(raw?.Fields?.Field.find(field => field.Name === 'SCALING').Utf8String) || undefined;
      
      return Number.parseFloat((rawRate / rawScalingFactor).toFixed(8)) || undefined;
    }
    return 1;
  }
}