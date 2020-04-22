import { injectable, inject } from 'inversify';

import types from '../../../constants/types';
import { IReutersService, IReutersApi, IReutersResponseItem, IReutersRateResponse } from '../rate.interfaces';
import { ICurrencyPair } from '../../../commons/interfaces/entities/ICurrencyPair';

@injectable()
export class ReutersService implements IReutersService {
  @inject(types.ReutersApi) private readonly reutersApi: IReutersApi;

  public async getRates(currencyPairs: ICurrencyPair[]): Promise<IReutersResponseItem[]> {
    const apiResponses = [];
    const groupedPairs = this.getGroupedCurrencyPairs(currencyPairs);
    
    for (const sourceCurrency of Object.keys(groupedPairs)) {
      const currencyPairIdentifiers = groupedPairs[sourceCurrency].map(
        currencyPair => currencyPair.reutersInstrumentCode
      );
      
      const apiResponse = await this.reutersApi.getRates(currencyPairIdentifiers);
      apiResponses.push(apiResponse);
    }
    return this.extractAndMergeResponses(apiResponses);
  }

  private getGroupedCurrencyPairs(currencyPairs: ICurrencyPair[]): Record<string, ICurrencyPair[]> {
    return currencyPairs.reduce((groupedPairs, currencyPair) => {
      const sourceCurrencyCode = currencyPair.sourceCurrency.isoCode;
      if (!groupedPairs[sourceCurrencyCode]) {
        groupedPairs[sourceCurrencyCode] = [];
      }
      groupedPairs[sourceCurrencyCode].push(currencyPair);
      return groupedPairs;
    }, {});
  }

  private extractAndMergeResponses(responses: IReutersRateResponse[]): IReutersResponseItem[] {
    return responses.reduce((transformedResponses, response) => {
      return [...transformedResponses, ...response.RetrieveItem_Response_3.ItemResponse[0].Item]
    }, []);
  }
}