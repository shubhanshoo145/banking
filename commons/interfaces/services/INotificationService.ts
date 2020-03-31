export interface INotificationService {
  createNotification(options): Promise<void>;
  markAsRead (options: any);
  markAsSeen (options: any);
  getUnreadMessageCount (options: any);
  getUnseenMessageCount (options: any);
  getUserNotifications (options: any);
}
