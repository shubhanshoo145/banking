import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface IAccount {
  _id: any,
  account_number: string,
  balance: number,
  pin: string,
  card_number: string,
}

export interface IAccountDocument extends Document, IAccount {

}

export interface IAccountRepository {
  updateAccountBalance(accountNumber: string, amount: number);
  getAccountBalance(accountNumber: string);
  createAccount(accountObject);
  getAccountByCardNumber(cardNumber: string);
}

export interface IAccountService {
  validateAccount(cardNumber: string, pin: string): Promise<IAccount>;
  createAccount(accountObject): Promise<IAccount>;
  getAccountByCardNumber(cardNumber: string): Promise<IAccount>;
  depositToAccount(accountNumber: string, amount: number): Promise<IAccount>;
  withdrawFromAccount(accountNumber: string, amount: number): Promise<IAccount>;
  getAccountBalance(accountNumber: string): Promise<IAccount>;
}