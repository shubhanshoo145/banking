import { IConfig } from 'config';
import { inject, injectable } from 'inversify';
import * as moment from 'moment';

import types from '../../../constants/types';
import { TemplateItemType } from '../infrastructure/templateGenerator.constants';
import { IEmailNotificationService, INotificationEngineRequest, IEmailTemplateGeneratorService } from '../notification.interfaces';
import { IErrorLoggedEvent } from "../../../commons/interfaces/events/IErrorLoggedEvent";
import { INotificationService } from '../../../commons/interfaces/services/INotificationService';
import { INotificationConfig } from '../../../commons/interfaces/config/INotificationConfig';


@injectable()
export class EmailNotificationService implements IEmailNotificationService {
  @inject(types.NotificationService) private notificationService: INotificationService;
  @inject(types.EmailTemplateGeneratorService) private readonly templateGeneratorService: IEmailTemplateGeneratorService;

  private notificationConfig: INotificationConfig;

  constructor(@inject(types.Config) config: IConfig) {
    this.notificationConfig = config.get('default.notifications');
  }

  /**
   * @public @async @function
   * @param errorEvent An object representing an error logged event
   * @description This method sends an email notification regarding masspay errors
   */
  public async sendErrorNotification(errorEvent: IErrorLoggedEvent): Promise<void> {
    if (!this.notificationConfig.MAIL_ERRORS_TO) {
      return;
    }

    const recipients: string[] = this.notificationConfig.MAIL_ERRORS_TO;

    await this.notificationService
      .createNotification({
        type: 'Email notification',
        email_message: {
          type: 'Error notification',
          custom: {
            title: `Masspay error @ ${moment().format('YYYY-MM-DD HH:mm:ssZ')}`,
            body: this.templateGeneratorService.generateInternalTemplate([{
              type: TemplateItemType.STRING,
              value: `Level: ${errorEvent.level}<br/>
              Message: ${errorEvent.message}<br/>
              Timestamp: ${errorEvent.timestamp}<br/><br/>
      
              Error JSON<br/><code>${JSON.stringify(errorEvent.meta)}</code>`,
            }]),
            content_type: 'text/html',
            sender_identifier: 'masspay@instarem.com',
            sender_name: 'Masspay',
          },
          extras: {},
          params: {},
          targets: {
            to: recipients,
          },
          service: 'sendgrid',
        },
      } as INotificationEngineRequest);
  }
}
