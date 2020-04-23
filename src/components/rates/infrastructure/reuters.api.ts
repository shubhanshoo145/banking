import { injectable, inject } from 'inversify';
import axios, { AxiosResponse } from 'axios';
import { IConfig } from 'config';
import * as moment from 'moment';

import types from '../../../constants/types';
import { IReutersApi, IReutersTokenResponse, IReutersToken, IReutersRateResponse } from "../rate.interfaces";
import { ILoggerService } from '../../../commons/interfaces/services/ILoggerService';
import { IReutersConfig } from '../../../commons/interfaces/config/IReutersConfig';

@injectable()
export class ReutersApi implements IReutersApi {
  @inject(types.LoggerService) private loggerService: ILoggerService;

  private token: IReutersToken;
  private config: IReutersConfig;

  constructor(@inject(types.Config) config: IConfig) {
    this.config = config.get('default.reuters');
  }

  public async getRates(currencyPairs: Array<{ Name: string, NameType: string }>): Promise<IReutersRateResponse> {
    try {
      const token = await this.getToken();
      const response: AxiosResponse<IReutersRateResponse> = await axios({
        method: 'POST',
        url: this.config.REUTERS_RATE_URL,
        headers: {
          'content-type': 'application/json',
          'X-Trkd-Auth-ApplicationID': this.config.REUTERS_APPLICATION_ID,
          'X-Trkd-Auth-Token': token.Token,
        },
        data: {
          RetrieveItem_Request_3: {
            TrimResponse: false,
            IncludeChildItemQoS: false,
            ItemRequest: [{
              Fields: 'SCALING:CF_LAST:CF_CURRENCY:CF_BID',
              RequestKey: currencyPairs,
              Scope: 'List',
            }],
          }
        }
      });
      return response.data;
    } catch (error) {
      this.loggerService.error('An error has been encountered while trying to get rates', {
        error,
        headers: error.config.headers,
        data: error.config.data,
        url: error.config.url,
        responseData: error.response.data,
      });
      return null;
    }
  }

  private async getToken(): Promise<IReutersToken> {
    if (!this.token || (moment.utc(this.token.Expiration)).isSameOrBefore(moment.utc())) {
      this.token = await this.retrieveToken();
    }
    return this.token;
  }

  private async retrieveToken(): Promise<IReutersToken> {
    const response: AxiosResponse<IReutersTokenResponse> = await axios({
      method: 'POST',
      url: this.config.REUTERS_TOKEN_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        CreateServiceToken_Request_1: {
          ApplicationID: this.config.REUTERS_APPLICATION_ID,
          Username: this.config.REUTERS_USERNAME,
          Password: this.config.REUTERS_PASSWORD,
        },
      }
    });

    this.loggerService.info('Retrieved reuters token', {
      token: response.data.CreateServiceToken_Response_1,
    });

    return response.data.CreateServiceToken_Response_1;
  }
}