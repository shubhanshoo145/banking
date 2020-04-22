import 'reflect-metadata';
import { deferConfig } from 'config/defer';
import { EncryptionService } from '../components/application/encryption.service';
import { IServiceConfig } from '../commons/interfaces/config/IServiceConfig';

const config: Pick<IServiceConfig, 'mongoose' | 'redis' | 'notifications'> = {
  mongoose: {
    DB: 'masspay-v2-uat',
    DB_URI: '161.202.19.190:27017',
    DB_USERNAME: 'uatMasspay',
    REPLICA_SET: null,
    DB_PASSWORD_ENCRYPTED: '7gxG0g5mGX+AlEJv38JH9NbIS4Cu4MPYs4oIdxWWRzbEzM3XYLOj2hbmKhvfRKcKcqIfEORNIJ5yu0lK/lUgi/PpSlh62bALIG8Z+5Q6sYCEbPi0NfB2YWZQsFLVzUKOB9XZaPKUQEyOFa7m',
    DB_CONNECTION_STRING: deferConfig(() => {
      return `mongodb://${config.mongoose.DB_USERNAME}:${EncryptionService.decrypt(config.mongoose.DB_PASSWORD_ENCRYPTED)}@${config.mongoose.DB_URI}/${config.mongoose.DB}`;
    }),
  },
  redis: {
    URI: '161.202.19.190',
    PORT: 6379,
    ENCRYPTED_PASSWORD: 'RwAqz8c8F9J6JnqkthtB+axOFKXaSiVQzPzOErhB3UJXIhdkjVX87CC/N5e3/g4clCqCloeIe2TH+ozbskKuknn1CXlfiP7HlU0mokxp/W1HWcp7S/5oqzPpzVSwu1EdyeSIVM3VKh5u9Q==',
    PASSWORD: deferConfig(() => EncryptionService.decrypt(config.redis.ENCRYPTED_PASSWORD)),
  },
  notifications: {
    NOTIFICATION_SERVICE_ENABLED: true,
    NOTIFICATION_ENDPOINT: 'https://uatservices.instarem.com/notification/api/v1',
    NOTIFICATION_SECRET_KEY_ENCRYPTED: 'm6jtW75vxA4RBNc999gL+HvEsjKyz/fR8NFnyL3sUaVEdL5W7iqZuPWf8KyQIy0fqSlhzbryuCGQqQlOWX/xgCUyei3pT//BX7kvkq06QY/ANnzyVCN2Q1JfmcKOlhQ/tnWYrNPM6tt5TKbjYGp2rD6pd/Kv/CRJShOgtSI=',
    NOTIFICATION_SECRET_KEY: deferConfig(() => EncryptionService.decrypt(config.notifications.NOTIFICATION_SECRET_KEY_ENCRYPTED)),
    MAIL_ERRORS_TO: [''],
  },
};

export default config;
