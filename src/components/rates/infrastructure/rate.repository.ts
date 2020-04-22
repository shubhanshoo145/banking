import { injectable, inject } from 'inversify';
import { Model } from 'mongoose';

import types from '../../../constants/types';
import { IRateRepository, IRateDocument, ILeanRateDocument } from '../rate.interfaces';
import { IRate } from '../../../commons/interfaces/entities/IRate';

@injectable()
export class RateRepository implements IRateRepository {
  @inject(types.RateModel) private readonly model: Model<IRateDocument>;

  public async storeRates(rates: IRate[]): Promise<void> {
    const insertedDocument = new this.model({
      rates: rates.map(rate => rate.serialize())
    } as Partial<ILeanRateDocument>);
    await insertedDocument.save();
  }
}