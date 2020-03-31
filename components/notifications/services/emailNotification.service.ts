import * as config from 'config';
import { inject, injectable } from 'inversify';
import * as moment from 'moment';


import { TemplateItemType } from '../infrastructure/templateGenerator.constants';
import { IErrorLoggedEvent } from "../../../commons/interfaces/events/IErrorLoggedEvent";
import { IEmailNotificationService, INotificationEngineRequest, IEmailTemplateGeneratorService } from '../notification.interfaces';
import types from '../../../constants/types';
import { INotificationService } from '../../../commons/interfaces/services/INotificationService';


@injectable()
export class EmailNotificationService implements IEmailNotificationService {
  @inject(types.NotificationService) private notificationService: INotificationService;
  @inject(types.EmailTemplateGeneratorService) private readonly templateGeneratorService: IEmailTemplateGeneratorService;

  /**
   * @public @async @function
   * @param errorEvent An object representing an error logged event
   * @description This method sends an email notification regarding masspay errors
   */
  public async sendErrorNotification(errorEvent: IErrorLoggedEvent): Promise<void> {
    if (!config.has('default.notifications.MAIL_ERRORS_TO')) {
      return;
    }

    const recipients: string[] = config.get('default.notifications.MAIL_ERRORS_TO');

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
