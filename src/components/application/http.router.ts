import { injectable, postConstruct, inject } from 'inversify';
import { Express, Router } from 'express';

import healtcheckController from './../../web/endpoints/healtcheck.controller';
import bankingController from '../../web/endpoints/banking.controller';
import types from '../../constants/types';
import { IMiddlewareProvider } from '../../commons/interfaces/middleware/IMiddlewareProvider';
import { IHttpRouter } from "./application.interfaces";
import accountingController from '../../web/endpoints/accounting.controller';

@injectable()
export class HttpRouter implements IHttpRouter {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public register(webServer: Express): void {
    webServer.use('/api/v1', this.router);
  }

  @postConstruct()
  private initializeRoutes(): void {
    healtcheckController(this.router);
    bankingController(this.router);
    accountingController(this.router);
  }
}