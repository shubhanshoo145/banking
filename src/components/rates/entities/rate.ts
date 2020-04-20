import * as moment from 'moment';

import { BaseEntity } from '../../../commons/classes/baseEntity';
import { IRateProps } from '../rate.interfaces';
import { IRate } from '../../../commons/interfaces/entities/IRate';
import { ISerializedRate } from '../../../commons/interfaces/entities/ISerializedRate';

export class Rate extends BaseEntity<IRateProps> implements IRate {
  private constructor(props: IRateProps, id?: string) {
    super(props, id);
  }

  set expiresAt(expiryTime: Date) {
    if (expiryTime < moment.utc().toDate()) {
      throw new Error('Specified expiry time is in the past');
    }
    this.props.expiresAt = expiryTime;
  }

  public serialize(): ISerializedRate {
    return {
      source_currency: this.props.currencyPair.sourceCurrency.isoCode,
      destination_currency: this.props.currencyPair.destinationCurrency.isoCode,
      fx_rate: this.props.fxRate,
      scaling_factor: this.props.scalingFactor,
      expires_at: this.props.expiresAt || null,
    };
  };

  public static create(props: IRateProps, id?: string): IRate {
    const instance = new Rate(props);
    return instance;
  }
}