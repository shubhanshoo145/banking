import { Container } from 'inversify';
import { Model } from 'mongoose';
import * as config from 'config';

const container = new Container({ defaultScope: 'Singleton' });

import types from './constants/types';

import { Application } from './components/application/application';
import { MongooseService } from './components/application/mongoose.service';
import { IApplication } from './commons/interfaces/services/IApplication';
import { IMongooseService, IHttpService, IHttpRouter } from './components/application/application.interfaces';
import { ILoggerService } from './commons/interfaces/services/ILoggerService';
import { LoggerService } from './components/logging/services/logger.service';
import { HttpService } from './components/application/http.service';
import { HttpRouter } from './components/application/http.router';
import { IMiddlewareProvider } from './commons/interfaces/middleware/IMiddlewareProvider';
import { ErrorMiddleware } from './components/application/middleware/error.middleware';
import { BasicMiddleware } from './components/application/middleware/basic.middleware';
import { AccountService } from './components/acccounts/account.service';
import { AccountRepository } from './components/acccounts/account.repository';
import { TransactionService } from './components/transactions/transaction.service';
import { TransactionRepository } from './components/transactions/transaction.repository';
import { PasswordHasher } from './components/hasher/password.hasher';
import { IAccountDocument } from './components/acccounts/account.interface';
import accountModel from './components/acccounts/account.model';
import { ITransactionDocument } from './components/transactions/transaction.interface';
import transactionModel from './components/transactions/transaction.model';

// Config
container.bind<config.IConfig>(types.Config).toConstantValue(config);

// Application
container.bind<IApplication>(types.Application).to(Application);
container.bind<IMongooseService>(types.MongooseService).to(MongooseService);
container.bind<IHttpService>(types.HttpService).to(HttpService);
container.bind<IHttpRouter>(types.HttpRouter).to(HttpRouter);

// Middleware
container.bind<IMiddlewareProvider>(types.BasicMiddleware).to(BasicMiddleware);
container.bind<IMiddlewareProvider>(types.ErrorMiddleware).to(ErrorMiddleware);

// Logging
container.bind<ILoggerService>(types.LoggerService).to(LoggerService);

container.bind<AccountService>(types.AccountService).to(AccountService);
container.bind<AccountRepository>(types.AccountRepository).to(AccountRepository);
container.bind<Model<IAccountDocument>>(types.AccountModel).toConstantValue(accountModel);

container.bind<TransactionService>(types.TransactionService).to(TransactionService);
container.bind<TransactionRepository>(types.TransactionRepository).to(TransactionRepository);
container.bind<Model<ITransactionDocument>>(types.TransactionModel).toConstantValue(transactionModel);

container.bind<PasswordHasher>(types.PasswordHasher).to(PasswordHasher);

export default container;