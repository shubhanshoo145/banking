import { inject, injectable } from "inversify";
import types from "../../constants/types";
import { ITransaction, ITransactionService } from "./transaction.interface";
import { TransactionRepository } from "./transaction.repository";

@injectable()
export class TransactionService implements ITransactionService {
  @inject(types.TransactionRepository) private readonly transactionRepository: TransactionRepository;

  public async createTransaction(transactionObj): Promise<ITransaction> {
    return await this.transactionRepository.createTransaction(transactionObj);
  }

  public async getTransactionsByAccountId(accountId: string, project) {
    return await this.transactionRepository.getTransactionsByAccountId(accountId, project);
  }
}