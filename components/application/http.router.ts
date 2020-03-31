import { injectable, postConstruct, inject } from 'inversify';
import { Express, Router } from 'express';

import healtcheckController from './../../web/endpoints/healtcheck.controller';
import cronjobsController from '../../web/endpoints/cronjobs.controller';
import ratesController from '../../web/endpoints/rates.controller';
import types from '../../constants/types';
import { IMiddlewareProvider } from '../../commons/interfaces/middleware/IMiddlewareProvider';
import { IHttpRouter } from "./application.interfaces";

@injectable()
export class HttpRouter implements IHttpRouter {
  @inject(types.IpAuthenticationMiddleware) private readonly ipAuthenticationMiddleware: IMiddlewareProvider;
  @inject(types.AuthorizationMiddleware) private readonly authorizationMiddleware: IMiddlewareProvider;
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public register(webServer: Express): void {
    webServer.use('/v1', this.router);
  }

  @postConstruct()
  private initializeRoutes(): void {
    healtcheckController(this.router);
    cronjobsController(this.router);

    this.ipAuthenticationMiddleware.register(this.router);
    // this.authorizationMiddleware.register(this.router);

    ratesController(this.router);
  }
}