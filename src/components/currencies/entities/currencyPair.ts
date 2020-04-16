import { ICurrencyPairProps } from '../currency.interfaces';
import { BaseEntity } from '../../../commons/classes/baseEntity';
import { ICurrencyPair } from '../../../commons/interfaces/entities/ICurrencyPair';
import { ICurrency } from '../../../commons/interfaces/entities/ICurrency';
import { CustomReutersPairs } from '../../../constants/customReutersPairs';

export class CurrencyPair extends BaseEntity<ICurrencyPairProps> implements ICurrencyPair {
  private constructor(props: ICurrencyPairProps, id?: string) {
    super(props, id);
  }

  get sourceCurrency(): ICurrency {
    return this.props.sourceCurrency;
  }

  get destinationCurrency(): ICurrency {
    return this.props.destinationCurrency;
  }

  get reutersInstrumentCode(): { Name: string, NameType: string } {
    const currencyPairKey = `${this.props.sourceCurrency.isoCode}${this.props.destinationCurrency.isoCode}`;

    return {
      Name: CustomReutersPairs[currencyPairKey] || `${currencyPairKey}=R`,
      NameType: 'RIC'
    };
  }

  public static create(props: ICurrencyPairProps, id?: string): ICurrencyPair {
    const instance = new CurrencyPair(props);
    return instance;
  }
}