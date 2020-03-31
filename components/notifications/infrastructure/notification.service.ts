import axios from 'axios';
import * as config from 'config';
import { injectable, inject } from 'inversify';
import * as Joi from '@hapi/joi';

import types from '../../../constants/types';
import { INotificationService } from '../../../commons/interfaces/services/INotificationService';
import { ILoggerService } from '../../../commons/interfaces/services/ILoggerService';

@injectable()
export class NotificationService implements INotificationService {
  @inject(types.LoggerService) private readonly loggerService: ILoggerService;

  private notificationEngineEndpoint: string;
  private appKey: string;

  public constructor () {
    this.initializeService();
  }

  public async createNotification(options): Promise<void> {
    try {
      const response = await this.makeRequest(Object.assign(
          { url: `${this.notificationEngineEndpoint}/notification`, method: 'post' },
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

  public async markAsRead (options: any = {}) {
    options.status = 'read';
    return await this.updateStatus(options);
  }

  public async markAsSeen (options) {
    options.status = 'seen';
    return await this.updateStatus(options);
  }

  public async getUnreadMessageCount (options: any = {}) {
    options.status = 'read';
    return await this.getMessageCount(options);
  }

  public async getUnseenMessageCount (options) {
    options.status = 'seen';
    return await this.getMessageCount(options);
  }

  public async getUserNotifications (options) {
    return await this.makeRequest(
      Object.assign(
        { url: `${this.notificationEngineEndpoint}/user-notifications`, method: 'get' },
        { params: options },
      ),
    );
  }

  private async getMessageCount (options) {
    return await this.makeRequest(
      Object.assign(
        { url: `${this.notificationEngineEndpoint}/user-notification/count`, method: 'get' },
        { params: options },
      ),
    );
  }

  private async updateStatus (options) {
    return await this.makeRequest(
      Object.assign(
        { url: `${this.notificationEngineEndpoint}/user-notification`, method: 'put' },
        { params: options },
      ),
    );
  }

  /**
   *
   * @param {*} options
   * https://instarem.atlassian.net/wiki/spaces/NINSTA/pages/39059457/Notification+API
   */
  private async makeRequest (options) {
    if (!config.get('default.notifications.NOTIFICATION_SERVICE_ENABLED')) {
      return;
    }

    if (!this.appKey) {
      throw new Error(
        'Notification Service Api Secret is not provided. Please store your App Secret Key in the config property "NOTIFICATION_SECRET_KEY"',
      );
    }
    if (!this.notificationEngineEndpoint) {
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
      Authorization: `Bearer ${this.appKey}`,
    };

    return await axios(options);
  }

  private initializeService() {
    if (!config.has('default.notifications.NOTIFICATION_ENDPOINT')) {
      this.loggerService.error(`NOTIFICATION_ENDPOINT is not configured for ${process.env.NODE_ENV}`);
      return;
    }

    if (!config.has('default.notifications.NOTIFICATION_SECRET_KEY')) {
      this.loggerService.error(`NOTIFICATION_SECRET_KEY is not configured for ${process.env.NODE_ENV}`);
      return;
    }

    this.notificationEngineEndpoint = config.get('default.notifications.NOTIFICATION_ENDPOINT');
    this.appKey = config.get('default.notifications.NOTIFICATION_SECRET_KEY');
  }
}
