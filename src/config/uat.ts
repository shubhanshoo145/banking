import 'reflect-metadata';
import { deferConfig } from 'config/defer';
import { EncryptionService } from '../components/application/encryption.service';
import { IServiceConfig } from '../commons/interfaces/config/IServiceConfig';

const config: Pick<IServiceConfig, 'mongoose' | 'redis' | 'notifications'> = {
  mongoose: {
    DB: 'masspay-v2-test',
    DB_URI: '127.0.0.1:27017',
    DB_USERNAME: 'app-masspay-v2-test',
    REPLICA_SET: null,
    DB_PASSWORD_ENCRYPTED: '4vSMBcui3W6SODLrToTMUU4Q/zeCZivUsqt5lSFYw1vJYvIO3ypmg0IWPVWJMnXLndqN9VujHQC36+ImcXekmR6UwAZk6yWlvyGPwSXyLeLke7UfincVt9dKlaJotAcc4dINQL23d7fel3KhYBanEqvJ',
    DB_CONNECTION_STRING: deferConfig(() => {
      return `mongodb://${config.mongoose.DB_USERNAME}:${EncryptionService.decrypt(config.mongoose.DB_PASSWORD_ENCRYPTED)}@${config.mongoose.DB_URI}/${config.mongoose.DB}`;
    }),
  },
  redis: {
    URI: '127.0.0.1',
    PORT: 6379,
    ENCRYPTED_PASSWORD: null,
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
