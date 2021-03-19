import { injectable, inject } from 'inversify';
import { Model } from 'mongoose';

import types from '../../constants/types';
import { IAccountDocument, IAccountRepository } from './account.interface';

@injectable()
export class AccountRepository implements IAccountRepository {
  @inject(types.AccountModel) private readonly accountModel: Model<IAccountDocument>;

  public async createAccount(accountObject) {
    return await this.accountModel.create(accountObject);
  }

  public async getAccountByCardNumber(cardNumber: string) {
    return await this.accountModel.findOne({ card_number: cardNumber }).lean();
  }

  public async updateAccountBalance(accountNumber: string, amount: number) {
    return await this.accountModel.findOneAndUpdate({ account_number: accountNumber }, {
      $inc: {
        balance: amount,
      }
    }, { new: true }).lean();
  }

  public async getAccountBalance(accountNumber: string) {
    return await this.accountModel.findOne({ account_number: accountNumber }).lean();
  }
}