import { IReutersConfig } from './IReutersConfig';
import { IMiddlewareConfig } from './IMiddlewareConfig';
import { IRedisConfig } from './IRedisConfig';
import { IApplicationConfig } from './IApplicationConfig';
import { IHttpServerConfig } from './IHttpServerConfig';
import { IMongooseConfig } from './IMongooseConfig';
import { INotificationConfig } from './INotificationConfig';

export interface IServiceConfig {
  mongoose: IMongooseConfig;
  redis: IRedisConfig;
  httpServer: IHttpServerConfig;
  reuters: IReutersConfig;
  notifications: INotificationConfig;
  middleware: IMiddlewareConfig;
  application: IApplicationConfig;
}
