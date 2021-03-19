import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface ITransaction {
  _id: any,
  account_id: ObjectId,
  amount: number,
  type: string,
  running_balance: number,
}

export interface ITransactionDocument extends Document, ITransaction {

}

export interface ITransactionRepository {
  createTransaction(transactionObj): Promise<ITransaction>;
  getTransactionsByAccountId(accountId: string, project)
}

export interface ITransactionService {
  createTransaction(transactionObj): Promise<ITransaction>;
  getTransactionsByAccountId(accountId: string, project);
}