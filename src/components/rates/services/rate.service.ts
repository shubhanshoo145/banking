import { injectable, inject } from 'inversify';

import types from '../../../constants/types';
import { IRateService } from '../../../commons/interfaces/services/IRateService';
import { IReutersService, IRateRepository } from '../rate.interfaces';
import { IRate } from '../../../commons/interfaces/entities/IRate';
import { ICurrencyPair } from '../../../commons/interfaces/entities/ICurrencyPair';
import { RateMapper } from '../infrastructure/rate.mapper';
import { IRedisService } from '../../../commons/interfaces/services/IRedisService';

@injectable()
export class RateService implements IRateService {
  @inject(types.ReutersService) private readonly reutersService: IReutersService;
  @inject(types.RedisService) private readonly redisService: IRedisService;
  @inject(types.RateRepository) private readonly rateRepository: IRateRepository;

  public async getRates(currencyPairs: ICurrencyPair[]): Promise<IRate[]> {
    const reutersResponses = await this.reutersService.getRates(currencyPairs);
  
    return reutersResponses.map((response) => {
      const currencyPair = currencyPairs.find(
        pair => pair.reutersInstrumentCode.Name === response.RequestKey.Name
      );
      return RateMapper.toDomain(response, currencyPair);
    });
  }

  public async storeRates(rates: IRate[]): Promise<void> {
    await this.rateRepository.storeRates(rates);
  }

  public async postRates(rates: IRate[]): Promise<void> {
    await this.redisService.setKey('rates', JSON.stringify(
      this.toRedisFormat(rates)
    ));
  }

  private toRedisFormat(rates: IRate[]): Record<string, { fxRate: number, expiresAt: Date }> {
    return rates.reduce((rateObj, rate) => {
      const serializedRate = rate.serialize();
      const currencyKey = `${serializedRate.source_currency}${serializedRate.destination_currency}`;
      rateObj[currencyKey] = {
        fxRate: serializedRate.fx_rate,
        expiresAt: serializedRate.expires_at,
      };
      return rateObj;
    }, {});
  }
}