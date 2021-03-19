import { inject, injectable } from "inversify";
import types from "../../constants/types";
import { PasswordHasher } from "../hasher/password.hasher";
import { IAccount, IAccountService } from "./account.interface";
import { AccountRepository } from "./account.repository";

@injectable()
export class AccountService implements IAccountService {
  @inject(types.AccountRepository) private readonly accountRepository: AccountRepository;
  @inject(types.PasswordHasher) private readonly passwordHasher: PasswordHasher;

  public async validateAccount(cardNumber: string, pin: string) {
    const accountDetails = await this.getAccountByCardNumber(cardNumber);
    if (!accountDetails) throw new Error('Invalid CardNumber');
    const isMatch = this.passwordHasher.comparePasswordWithHash(pin, accountDetails.pin);
    if (!isMatch) throw new Error('Invalid pin');
    return accountDetails;
  }

  public async createAccount(accountObject): Promise<IAccount> {
    return await this.accountRepository.createAccount(accountObject);
  }

  public async getAccountByCardNumber(cardNumber: string): Promise<IAccount> {
    return await this.accountRepository.getAccountByCardNumber(cardNumber);
  }

  public async depositToAccount(accountNumber: string, amount: number): Promise<IAccount> {
    return await this.accountRepository.updateAccountBalance(accountNumber, amount * 1);
  }

  public async withdrawFromAccount(accountNumber: string, amount: number): Promise<IAccount> {
    return await this.accountRepository.updateAccountBalance(accountNumber, amount * -1);
  }

  public async getAccountBalance(accountNumber: string): Promise<IAccount> {
    return await this.accountRepository.getAccountBalance(accountNumber);
  }
}