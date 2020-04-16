import { TemplateItemType } from './infrastructure/templateGenerator.constants';
import { IErrorLoggedEvent } from "../../commons/interfaces/events/IErrorLoggedEvent";

export interface IEmailTemplateGeneratorService {
  generateInternalTemplate(pTemplateElements: ITemplateItem[]): string;
  generateExternalTemplate(pTemplateElements: ITemplateItem[]): string;
}

export interface ITemplateGenerator {
  generateTemplate(pTemplateElements: ITemplateItem[], pTemplate: string): string;
}

export interface ITemplateItem {
  type: TemplateItemType;
  value: string | string[][];
}

export interface INotificationResult {
  success: boolean;
  message?: string;
}

export interface ILowBalanceNotification {
  account_number: number;
  label: string;
  currency: string;
  notification_threshold: number;
  notification_email: string;
  balance: number;
}

export interface INotificationEngineRequest {
  type: string;
  sms_message?: any;
  email_message?: IEmailNotificationRequest;
  in_app_message?: any;
  push_message?: any;
  parent_notification_id?: any;
}

export interface IEmailNotificationRequest {
  type: string;
  template?: string;
  custom?: ICustomEmailNotificationRequest;
  extras?: any;
  params?: any;
  targets: { to: string[] };
  service: string;
}

export interface ICustomEmailNotificationRequest {
  title: string;
  body: string;
  content_type: string;
  sender_identifier: string;
  sender_name: string;
}

export interface IEmailNotificationService {
  sendErrorNotification(errorEvent: IErrorLoggedEvent): Promise<void>;
}
