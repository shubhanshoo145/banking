import { injectable } from 'inversify';
import * as Transport from 'winston-transport';

import types from '../../../constants/types';
import container from '../../../container';
import { IEmailTransport } from '../logging.interfaces';
import { IErrorLoggedEvent } from "../../../commons/interfaces/events/IErrorLoggedEvent";
import { IEmailNotificationService } from '../../notifications/notification.interfaces';

const message: any = Symbol.for('message');
const splat: any = Symbol.for('splat');

@injectable()
export class EmailTransport extends Transport implements IEmailTransport {
  private emailNotificationService: IEmailNotificationService;

  constructor(opts) {
    super(opts);
  }

  public log(info: any, callback: any): void {
    if (!this.emailNotificationService) {
      this.emailNotificationService = container.get<IEmailNotificationService>(types.EmailNotificationService);
    }

    this.emailNotificationService.sendErrorNotification({
      level: info.level,
      message: info.message,
      timestamp: info.timestamp,
      rawMessage: JSON.parse(info[message]),
      meta: info[splat],
    } as IErrorLoggedEvent);

    if (callback) callback();
  }
}
