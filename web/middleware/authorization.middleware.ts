import { Express, Request, Response, NextFunction, Router } from 'express';
import { injectable, inject } from 'inversify';
import { IConfig } from 'config';
import * as cryptoJs from 'crypto-js';

import { IMiddlewareProvider } from '../../commons/interfaces/middleware/IMiddlewareProvider';
import types from '../../constants/types';
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
    const authorizationHeader = req.headers?.authorization;

    if (!authorizationHeader) {
      return next(new Error('Missing authorization header'));
    }

    const bytes = cryptoJs.AES.decrypt(authorizationHeader, this.middlewareConfig.AUTH_SECRET);
    const plaintext = bytes.toString(cryptoJs.enc.Utf8);

    if (plaintext !== this.middlewareConfig.AUTH_KEY) {
      this.loggerService.info('Authorization header is incorrect', {
        url: req.url,
        headers: req.headers,
      });
    
      return next(new Error('Incorrect authorization header'));
      
    }
    next();
  }
}