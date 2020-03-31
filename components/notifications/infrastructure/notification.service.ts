import axios from 'axios';
import { injectable, inject, postConstruct } from 'inversify';
import { IConfig } from 'config';
import * as Joi from '@hapi/joi';

import types from '../../../constants/types';
import { INotificationService } from '../../../commons/interfaces/services/INotificationService';
import { ILoggerService } from '../../../commons/interfaces/services/ILoggerService';
import { INotificationConfig } from '../../../commons/interfaces/config/INotificationConfig';

@injectable()
export class NotificationService implements INotificationService {
  @inject(types.LoggerService) private readonly loggerService: ILoggerService;

  private notificationConfig: INotificationConfig;

  public constructor (@inject(types.Config) config: IConfig) {
    this.notificationConfig = config.get('default.notifications');
  }

  public async createNotification(options): Promise<void> {
    try {
      const response = await this.makeRequest(Object.assign(
          { url: `${this.notificationConfig.NOTIFICATION_ENDPOINT}/notification`, method: 'post' },
          { data: options },
        ),
      );

      if (response && response.data && response.data.error && response.data.success === false) {
        this.loggerService.error('Notification engine has failed to send a notification.', response.data.error);
      }
    } catch (err) {
      this.loggerService.error('Notification Engine error', err);
    }
  }

  /**
   *
   * @param {*} options
   * https://instarem.atlassian.net/wiki/spaces/NINSTA/pages/39059457/Notification+API
   */
  private async makeRequest (options) {
    if (!this.notificationConfig.NOTIFICATION_SERVICE_ENABLED) {
      return;
    }

    if (!this.notificationConfig.NOTIFICATION_SECRET_KEY) {
      throw new Error(
        'Notification Service Api Secret is not provided. Please store your App Secret Key in the config property "NOTIFICATION_SECRET_KEY"',
      );
    }
    if (!this.notificationConfig.NOTIFICATION_ENDPOINT) {
      throw new Error(
        'Notification Service URL is not provided. Please store notification endpoint in the config property "NOTIFICATION_SERVICE_URL"',
        );
    }
    Joi.assert(options, Joi.object().options({ abortEarly: false }).keys({
      method: Joi.string().valid(['post', 'get', 'put']).required(),
      url: Joi.string().required(),
      params: Joi.object().optional(),
      data: Joi.object().optional(),
    }));
    options.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.notificationConfig.NOTIFICATION_SECRET_KEY}`,
    };

    return await axios(options);
  }

  @postConstruct()
  private initializeService() {
    if (!this.notificationConfig.NOTIFICATION_ENDPOINT) {
      this.loggerService.error(`NOTIFICATION_ENDPOINT is not configured for ${process.env.NODE_ENV}`);
      return;
    }

    if (!this.notificationConfig.NOTIFICATION_SECRET_KEY) {
      this.loggerService.error(`NOTIFICATION_SECRET_KEY is not configured for ${process.env.NODE_ENV}`);
      return;
    }
  }
}
