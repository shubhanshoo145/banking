import { Express, Request, Response, NextFunction, Router } from 'express';
import { injectable, inject } from 'inversify';
import { IConfig } from 'config';
import { isIPv4 } from 'net';

import types from '../../constants/types';
import { IMiddlewareProvider } from '../../commons/interfaces/middleware/IMiddlewareProvider';
import { ILoggerService } from '../../commons/interfaces/services/ILoggerService';
import { IMiddlewareConfig } from '../../commons/interfaces/config/IMiddlewareConfig';

@injectable()
export class IpAuthenticationMiddleware implements IMiddlewareProvider {
  @inject(types.LoggerService) private readonly loggerService: ILoggerService;

  private middlewareConfig: IMiddlewareConfig;

  constructor(@inject(types.Config) config: IConfig) {
    this.middlewareConfig = config.get('default.middleware');
  }

  public register(router: Router | Express): void {
    router.use(this.authenticate.bind(this));
  }

  private async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    const rawIpAddress = req.header('x-forwarded-for') ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress;

    const splitAddress = rawIpAddress.split(':');
    const ipAddress = splitAddress.length > 1 ?
      splitAddress[splitAddress.length - 1] : rawIpAddress;

    if (
      !this.isWhitelistedIp(ipAddress, this.middlewareConfig.WHITELISTED_IPS) &&
      !this.isWhitelistedSubnet(ipAddress, this.middlewareConfig.WHITELISTED_SUBNETS)
    ) {
      this.loggerService.info('Denied access to IP', {
        ipAddress,
      });
      return next(new Error('IP Address not whitelisted'));
    }
    next();
  }

  private isWhitelistedIp(ipAddress: string, whitelistedIpAddresses: string[]): boolean {
    return whitelistedIpAddresses.some(whitelistedIp => whitelistedIp === ipAddress);
  }

  private isWhitelistedSubnet(ipAddress, whitelistedSubnets: RegExp[]): boolean {
    if (isIPv4(ipAddress)) {
      return whitelistedSubnets.some(whitelistedSubnet => whitelistedSubnet.test(ipAddress));
    }
    return false;
  }
}
