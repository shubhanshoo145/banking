import { Express, Request, Response, NextFunction, Router } from 'express';
import { injectable, inject } from 'inversify';
import { IConfig } from 'config';
import * as cryptoJs from 'crypto-js';

import types from '../../constants/types';
import { IMiddlewareProvider } from '../../commons/interfaces/middleware/IMiddlewareProvider';
import { ILoggerService } from '../../commons/interfaces/services/ILoggerService';
import { IMiddlewareConfig } from '../../commons/interfaces/config/IMiddlewareConfig';

@injectable()
export class AuthorizationMiddleware implements IMiddlewareProvider {
  @inject(types.LoggerService) private readonly loggerService: ILoggerService;

  private middlewareConfig: IMiddlewareConfig;

  constructor(@inject(types.Config) config: IConfig) {
    this.middlewareConfig = config.get('default.middleware');
  }

  public register(router: Router | Express): void {
    router.use(this.authorize.bind(this));
  }

  private async authorize(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authorizationHeader = req.headers?.authorization;

      if (!authorizationHeader) {
        throw new Error('Missing authorization header');
      }

      const bytes = cryptoJs.AES.decrypt(authorizationHeader, this.middlewareConfig.AUTH_KEY);
      const plaintext = bytes.toString(cryptoJs.enc.Utf8);

      if (plaintext !== this.middlewareConfig.AUTH_SECRET) {
        this.loggerService.info('Authorization header is incorrect', {
          url: req.url,
          headers: req.headers,
        });
      
       throw new Error('Incorrect authorization header');
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}