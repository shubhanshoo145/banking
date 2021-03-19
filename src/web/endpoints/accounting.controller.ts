import { Router, Request, Response, NextFunction } from "express";
import { ILoggerService } from "../../commons/interfaces/services/ILoggerService";
import { AccountService } from "../../components/acccounts/account.service";
import { PasswordHasher } from "../../components/hasher/password.hasher";
import { LoggerService } from "../../components/logging/services/logger.service";
import types from "../../constants/types";
import container from "../../container";

export default (router: Router) => {
  router.post('/createAccount', async (req: Request, res: Response, next: NextFunction) => {
    const accountService = container.get<AccountService>(types.AccountService);
    const passwordHasher = container.get<PasswordHasher>(types.PasswordHasher);
    const loggerService = container.get<ILoggerService>(types.LoggerService);
    try {
      const hashedPin = passwordHasher.generateHash(req.body.pin);
      const accountObject = {
        account_number: req.body.accountNumber,
        pin: hashedPin,
        card_number: req.body.cardNumber,
        balance: 0,
      }
      const accountResponse = await accountService.createAccount(accountObject);
      res.send({
        success: true,
        message: 'Account created successfully',
        data: {
          account_number: accountResponse.account_number,
          card_number: accountResponse.card_number,
          balance: accountResponse.balance,
        }
      });
    } catch (err) {
      loggerService.info('Error while creating account', err);
      next(err);
    }
  })
}