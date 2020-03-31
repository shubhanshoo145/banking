import { Document } from 'mongoose';
import { ICurrencyPair } from '../../commons/interfaces/entities/ICurrencyPair';
import { IRate } from '../../commons/interfaces/entities/IRate';

export interface IReutersApi {
  getRates(currencyPairs: Array<{ Name: string, NameType: string }>): Promise<IReutersRateResponse>;
}

export interface IReutersTokenResponse {
  CreateServiceToken_Response_1: IReutersToken;
}

export interface IReutersToken {
  Expiration: string,
  Token: string
}

export interface IReutersRateResponse {
  RetrieveItem_Response_3: {
    ItemResponse: Array<{
      Item: IReutersResponseItem[] 
    }>
  }
}

export interface IReutersResponseItem {
  RequestKey: {
    Name: string;
    Service: string;
    NameType: string;
  },
  QoS: {
    TimelinessInfo: {
      Timeliness: string;
      TimeInfo: number;
    },
    RateInfo: {
      Rate: string;
      TimeInfo: number;
    }
  },
  Status: {
    StatusMsg: string;
    StatusCode: number;
  },
  Fields: {
    Field?: Array<{
      DataType: string;
      Name: string;
      Utf8String?: string;
      Double?: number;
    }>
  }
}

export interface ILeanRateDocument {
  _id: any;
  rates: Array<{
    source_currency: string;
    destination_currency: string;
    fx_rate: number;
    expires_at: Date;
    scaling_factor: number;
  }>;
  created_at?: Date;
  updated_at?: Date
}

export interface IRateDocument extends Document, ILeanRateDocument {
}

export interface IRateRepository {
  storeRates(rates: IRate[]): Promise<void>;
}

export interface IRateProps {
  currencyPair: ICurrencyPair;
  fxRate: number;
  scalingFactor: number;
  expiresAt?: Date;
}

/**
 * @private
 */
export interface IReutersService {
  getRates(currencyPairs: ICurrencyPair[]): Promise<IReutersResponseItem[]>;
}