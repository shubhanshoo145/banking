import { Container } from 'inversify';
import config = require('config');
import { Model } from 'mongoose';

const container = new Container({ defaultScope: 'Singleton' });

import types from './constants/types';
import currencyModel from './components/currencies/infrastructure/currency.model';
import rateModel from './components/rates/infrastructure/rate.model';

import { Application } from './components/application/application';
import { MongooseService } from './components/application/mongoose.service';
import { IApplication } from './commons/interfaces/services/IApplication';
import { IMongooseService, IHttpService, IHttpRouter } from './components/application/application.interfaces';
import { ILoggerService } from './commons/interfaces/services/ILoggerService';
import { LoggerService } from './components/logging/services/logger.service';
import { IRedisService } from './commons/interfaces/services/IRedisService';
import { RedisService } from './components/application/redis.service';
import { HttpService } from './components/application/http.service';
import { HttpRouter } from './components/application/http.router';
import { IMiddlewareProvider } from './commons/interfaces/middleware/IMiddlewareProvider';
import { ErrorMiddleware } from './components/application/middleware/error.middleware';
import { BasicMiddleware } from './components/application/middleware/basic.middleware';
import { INotificationService } from './commons/interfaces/services/INotificationService';
import { NotificationService } from './components/notifications/infrastructure/notification.service';
import { IEmailNotificationService, IEmailTemplateGeneratorService } from './components/notifications/notification.interfaces';
import { EmailNotificationService } from './components/notifications/services/emailNotification.service';
import { EmailTemplateGeneratorService } from './components/notifications/infrastructure/templateGenerator.service';
import { IRateService } from './commons/interfaces/services/IRateService';
import { RateService } from './components/rates/services/rate.service';
import { ICurrencyService } from './commons/interfaces/services/ICurrencyService';
import { CurrencyService } from './components/currencies/services/currency.service';
import { ICurrencyRepository, ICurrencyDocument } from './components/currencies/currency.interfaces';
import { CurrencyRepository } from './components/currencies/infrastructure/currency.repository';
import { IRateRepository, IRateDocument, IReutersApi, IReutersService } from './components/rates/rate.interfaces';
import { RateRepository } from './components/rates/infrastructure/rate.repository';
import { ReutersApi } from './components/rates/infrastructure/reuters.api';
import { ReutersService } from './components/rates/services/reuters.service';
import { IpAuthenticationMiddleware } from './web/middleware/ipAuthentication.middleware';
import { AuthorizationMiddleware } from './web/middleware/authorization.middleware';

// Config
container.bind<config.IConfig>(types.Config).toConstantValue(config);

// Application
container.bind<IApplication>(types.Application).to(Application);
container.bind<IMongooseService>(types.MongooseService).to(MongooseService);
container.bind<IRedisService>(types.RedisService).to(RedisService);
container.bind<IHttpService>(types.HttpService).to(HttpService);
container.bind<IHttpRouter>(types.HttpRouter).to(HttpRouter);

// Middleware
container.bind<IMiddlewareProvider>(types.BasicMiddleware).to(BasicMiddleware);
container.bind<IMiddlewareProvider>(types.ErrorMiddleware).to(ErrorMiddleware);
container.bind<IMiddlewareProvider>(types.AuthorizationMiddleware).to(AuthorizationMiddleware);
container.bind<IMiddlewareProvider>(types.IpAuthenticationMiddleware).to(IpAuthenticationMiddleware);

// Logging
container.bind<ILoggerService>(types.LoggerService).to(LoggerService);

// Notifications
container.bind<IEmailNotificationService>(types.EmailNotificationService).to(EmailNotificationService);
container.bind<IEmailTemplateGeneratorService>(types.EmailTemplateGeneratorService).to(EmailTemplateGeneratorService);
container.bind<INotificationService>(types.NotificationService).to(NotificationService);

// Currencies
container.bind<ICurrencyService>(types.CurrencyService).to(CurrencyService);
container.bind<ICurrencyRepository>(types.CurrencyRepository).to(CurrencyRepository);
container.bind<Model<ICurrencyDocument>>(types.CurrencyModel).toConstantValue(currencyModel);

// Rates
container.bind<IRateService>(types.RateService).to(RateService);
container.bind<IRateRepository>(types.RateRepository).to(RateRepository);
container.bind<Model<IRateDocument>>(types.RateModel).toConstantValue(rateModel);

// Reuters
container.bind<IReutersService>(types.ReutersService).to(ReutersService);
container.bind<IReutersApi>(types.ReutersApi).to(ReutersApi);

export default container;