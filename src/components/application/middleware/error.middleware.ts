import { injectable, inject } from 'inversify';
import { Express, NextFunction, Response, Request, Router } from 'express';

import types from '../../../constants/types';
import { ILoggerService } from '../../../commons/interfaces/services/ILoggerService';
import { IMiddlewareProvider } from '../../../commons/interfaces/middleware/IMiddlewareProvider';

@injectable()
export class ErrorMiddleware implements IMiddlewareProvider {
  @inject(types.LoggerService) private readonly loggerService: ILoggerService;

  public register(router: Router | Express): void {
    router.use(this.handleNotFound.bind(this));
    router.use(this.handleError.bind(this));
  }

  private handleNotFound(req: Request, res: Response, next: NextFunction) {
    throw new Error('Endpoint not found');
  }

  private handleError(err: any, req: Request, res: Response, next: NextFunction) {
    this.loggerService.error('An unexpected error occured while processing a request', { 
      err,
      headers: req?.headers,
      rawHeaders: req?.rawHeaders,
      authHeader: req?.headers['authorization'],
      uri: req?.url,
      baseUri: req?.baseUrl,
      body: req?.body,
      query: req?.query,
      params: req?.params,
      cookies: req?.cookies,
      method: req?.method,
    });

    res.status(err.status || 500).json({
      message: err.message || 'Unexpected error occurred',
      status: err.status || 500,
      name: 'Unexpected error',
    });
  }
}
