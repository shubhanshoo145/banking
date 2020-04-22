export default {
  // Config
  Config: Symbol.for('Config'),

  // Application bootstrap
  Application: Symbol.for('Application'),
  MongooseService: Symbol.for('MongooseService'),
  RedisService: Symbol.for('RedisService'),
  HttpService: Symbol.for('HttpService'),
  HttpRouter: Symbol.for('HttpRouter'),

  // Middleware
  BasicMiddleware: Symbol.for('BasicMiddleware'),
  ErrorMiddleware: Symbol.for('ErrorMiddleware'),
  IpAuthenticationMiddleware: Symbol.for('IpAuthenticationMiddleware'),
  AuthorizationMiddleware: Symbol.for('AuthorizationMiddleware'),
  

  // Notifications
  EmailNotificationService: Symbol.for('EmailNotificationService'),
  NotificationService: Symbol.for('NotificationService'),
  EmailTemplateGeneratorService: Symbol.for('EmailTemplateGeneratorService'),
  
  // Logging
  LoggerService: Symbol.for('LoggerService'),

  // Currencies
  CurrencyService: Symbol.for('CurrencyService'),
  CurrencyRepository: Symbol.for('CurrencyRepository'),
  CurrencyModel: Symbol.for('CurrencyModel'),

  // Rates
  RateService: Symbol.for('RateService'),
  RateRepository: Symbol.for('RateRepository'),
  RateModel: Symbol.for('RateModel'),

  // Reuters
  ReutersService: Symbol.for('ReutersService'),
  ReutersApi: Symbol.for('ReutersApi'),
};
