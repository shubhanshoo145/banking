import { ICurrencyProps } from '../currency.interfaces';
import { ICurrency } from '../../../commons/interfaces/entities/ICurrency';
import { BaseEntity } from '../../../commons/classes/baseEntity';

export class Currency extends BaseEntity<ICurrencyProps> implements ICurrency {
  private constructor(props: ICurrencyProps, id?: string) {
    super(props, id);
  }

  get isoCode(): string {
    return this.props.isoCode;
  }

  public static create(props: ICurrencyProps, id?: string): ICurrency {
    const instance = new Currency(props);
    return instance;
  }
}