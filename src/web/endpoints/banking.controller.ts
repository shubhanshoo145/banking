import { NextFunction, Router, Request, Response } from "express";
import { ILoggerService } from "../../commons/interfaces/services/ILoggerService";
import { AccountService } from "../../components/acccounts/account.service";
import { TransactionService } from "../../components/transactions/transaction.service";
import types from "../../constants/types";
import container from "../../container";

// Banking apis

export default (router: Router) => {
  router.post('/deposit', async (req: Request, res: Response, next: NextFunction) => {
    const accountService = container.get<AccountService>(types.AccountService);
    const transactionService = container.get<TransactionService>(types.TransactionService);
    const loggerService = container.get<ILoggerService>(types.LoggerService);

    try {
      const response = await accountService.getAccountByAccountNumber(req.body.accountNumber);
      if (!response) throw new Error('Account does not exist');
      const accountResponse = await accountService.depositToAccount(req.body.accountNumber, req.body.amount);
      const transctionObject = {
        account_id: accountResponse._id,
        type: 'CREDIT',
        amount: req.body.amount,
        running_balance: accountResponse.balance
      }
      const transactionResponse = await transactionService.createTransaction(transctionObject);
      res.send({
        success: true,
        data: {
          transaction_id: transactionResponse._id,
          amount: transactionResponse.amount,
          account_balance: transactionResponse.running_balance,
          type: transactionResponse.type
        }
      })
    } catch (err) {
      loggerService.info('Error while performing deposit', err);
      next(err);
    }
  })

  router.post('/withdraw', async (req: Request, res: Response, next: NextFunction) => {
    const accountService = container.get<AccountService>(types.AccountService);
    const transactionService = container.get<TransactionService>(types.TransactionService);
    const loggerService = container.get<ILoggerService>(types.LoggerService);
    try {
      const accountDetails = await accountService.validateAccount(req.body.cardNumber, req.body.pin);
      if (accountDetails.balance < req.body.amount) {
        throw new Error(`Insufficient funds ${accountDetails.balance}`);
      }
      const accountResponse = await accountService.withdrawFromAccount(accountDetails.account_number, req.body.amount);
      const transactionObj = {
        account_id: accountResponse._id,
        type: 'DEBIT',
        amount: req.body.amount,
        running_balance: accountResponse.balance,
      }
      const transactionResponse = await transactionService.createTransaction(transactionObj);
      res.send({
        success: true,
        data: {
          transaction_id: transactionResponse._id,
          amount: transactionResponse.amount,
          account_balance: transactionResponse.running_balance,
          type: transactionResponse.type
        }
      });
    } catch (err) {
      loggerService.info('Error during withdrawl', err);
      next(err);
    }
  })

  router.post('/balanceEnquiry', async (req: Request, res: Response, next: NextFunction) => {
    const accountService = container.get<AccountService>(types.AccountService);
    const loggerService = container.get<ILoggerService>(types.LoggerService);
    try {
      const accountDetails = await accountService.validateAccount(req.body.cardNumber, req.body.pin);
      res.send({
        success: true,
        data: {
          balance: accountDetails.balance
        },
      })
    } catch (err) {
      loggerService.info('Error while getting balance', err);
      next(err);
    }
  })

  router.post('/miniStatement', async (req: Request, res: Response, next: NextFunction) => {
    const accountService = container.get<AccountService>(types.AccountService);
    const transactionService = container.get<TransactionService>(types.TransactionService);
    const loggerService = container.get<ILoggerService>(types.LoggerService);
    try {
      const accountDetails = await accountService.validateAccount(req.body.cardNumber, req.body.pin);
      const projectQuery = {
        _id: 1,
        amount: 1,
        running_balance: 1,
        type: 1
      }
      const transactions = await transactionService.getTransactionsByAccountId(accountDetails._id, projectQuery);
      let response = [];
      // formatting the transaction response
      transactions.forEach((transaction) => {
        const obj = {
          transaction_id: transaction._id,
          amount: transaction.amount,
          running_balance: transaction.running_balance,
          type: transaction.type,
        }
        response.push(obj);
      })
      res.send({
        success: true,
        data: response
      });
    } catch (err) {
      loggerService.info('Error while generating mini statement', err);
      next(err);
    }
  })
}