import { IReutersConfig } from './IReutersConfig';
import { IMiddlewareConfig } from './IMiddlewareConfig';
import { IRedisConfig } from './IRedisConfig';
import { IApplicationConfig } from './IApplicationConfig';

export interface IServiceConfig {
  mongoose: any;
  redis: IRedisConfig;
  httpServer: any;
  reuters: IReutersConfig;
  middleware: IMiddlewareConfig;
  application: IApplicationConfig;
}
