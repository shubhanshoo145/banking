export default {
  // Config
  Config: Symbol.for('Config'),

  // Application bootstrap
  Application: Symbol.for('Application'),
  MongooseService: Symbol.for('MongooseService'),
  HttpService: Symbol.for('HttpService'),
  HttpRouter: Symbol.for('HttpRouter'),

  // Middleware
  BasicMiddleware: Symbol.for('BasicMiddleware'),
  ErrorMiddleware: Symbol.for('ErrorMiddleware'),

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

  BankingService: Symbol.for('BankingService'),

  AccountService: Symbol.for('AccountService'),
  AccountRepository: Symbol.for('AccountRepository'),
  AccountModel: Symbol.for('AccountModel'),

  TransactionModel: Symbol.for('TransactionModel'),
  TransactionRepository: Symbol.for('TransactionRepository'),
  TransactionService: Symbol.for('TransactionService'),

  PasswordHasher: Symbol.for('PasswordHasher'),
};
