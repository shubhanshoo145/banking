import { injectable, inject } from 'inversify';
import { Express, Router } from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';

import types from "../../../constants/types";
import { ILoggerService } from "../../../commons/interfaces/services/ILoggerService";
import { IMiddlewareProvider } from '../../../commons/interfaces/middleware/IMiddlewareProvider';

@injectable()
export class BasicMiddleware implements IMiddlewareProvider {
  @inject(types.LoggerService) private readonly loggerService: ILoggerService;

  public register(router: Router | Express): void {
    router.use(bodyParser.json({
      strict: true,
    }));

    router.use(bodyParser.urlencoded({
      extended: true,
    })) 

    router.use(
      morgan(':method :url :status :res[content-length] - :response-time ms', {
        stream: { write: (message) => { this.loggerService.info(message) } },
      }),
    );

    router.use(cors());
  }
}
