import { inject, injectable } from "inversify";
import { Model } from "mongoose";
import types from "../../constants/types";
import { ITransaction, ITransactionDocument, ITransactionRepository } from "./transaction.interface";

@injectable()
export class TransactionRepository implements ITransactionRepository {
  @inject(types.TransactionModel) private readonly transactionModel: Model<ITransactionDocument>;

  public async createTransaction(transactionObj): Promise<ITransaction> {
    return await this.transactionModel.create(transactionObj);
  }

  public async getTransactionsByAccountId(accountId: string, project) {
    return await this.transactionModel.find({ account_id: accountId }, project).lean();
  }
}