import { IConfig } from 'config';
import { injectable, inject } from 'inversify';
import { ClientOpts, createClient, RedisClient } from 'redis';

import types from '../../constants/types';
import { IRedisService } from '../../commons/interfaces/services/IRedisService';
import { ILoggerService } from '../../commons/interfaces/services/ILoggerService';
import { IRedisConfig } from '../../commons/interfaces/config/IRedisConfig';

@injectable()
export class RedisService implements IRedisService {
  @inject(types.LoggerService) private readonly loggerService: ILoggerService

  private redisClient: RedisClient;
  private redisConfig: IRedisConfig;

  constructor(@inject(types.Config) config: IConfig) {
    this.redisConfig = config.get('default.redis');
  }

  public async initializeClient(): Promise<void> {
    const connectionOptions: ClientOpts = {
      retry_strategy: this.retryStrategy,
      socket_keepalive: true,
    };

    if (this.redisConfig.PASSWORD) {
      connectionOptions.password = this.redisConfig.PASSWORD;
    }

    this.redisClient = createClient(this.redisConfig.PORT, this.redisConfig.URI, connectionOptions);
    this.redisClient.on('connect', () => {
      this.loggerService.info('Redis connected.');
    });
    this.redisClient.on('ready', () => {
      this.loggerService.info('Redis connection established.');
    });
    this.redisClient.on('error', (err) => {
      this.loggerService.error(`Redis Error ${err.message}`);
    });
    this.redisClient.on('reconnecting', () => {
      this.loggerService.info('Redis client reconnecting to redis server');
    });
    this.redisClient.on('end', () => {
      this.loggerService.info('Redis disconnected');
    });
  }

  public async shutdownClient(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.redisClient.quit((err, obj) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  public async setKey(key: string, value: string): Promise<void> {
    return await new Promise((resolve, reject) => {
      this.redisClient.set(key, value, (err, obj) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  public async getKey(key: string): Promise<string> {
    return await new Promise((resolve, reject) => {
      this.redisClient.get(key, (err, obj) => {
        if (err) reject(err);
        return resolve(obj);
      });
    });
  }

  public async expireKeyAt(key: string, unixTimestamp: number): Promise<void> {
    return await new Promise((resolve, reject) => {
      this.redisClient.expireat(key, unixTimestamp, (err, obj) => {
        if (err) reject(err);
        if (!obj) reject(new Error('Requested key not found'));
        return resolve();
      });
    });
  }

  public async incrementKeyBy(key: string, value: number): Promise<number> {
    return await new Promise((resolve, reject) => {
      this.redisClient.incrby(key, value, (err, obj) => {
        if (err) reject(err);
        return resolve(obj);
      });
    });
  }

  private retryStrategy(options): any {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with a individual error
      return new Error('The server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands with a individual error
      return new Error('Retry time exhausted');
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  }
}
