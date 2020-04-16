import 'reflect-metadata';
import { deferConfig } from 'config/defer';
import { EncryptionService } from '../components/application/encryption.service';
import { IServiceConfig } from '../commons/interfaces/config/IServiceConfig';

const config: Pick<IServiceConfig, 'mongoose' | 'redis' | 'notifications'> = {
  mongoose: {
    DB: 'masspay-v2-test',
    DB_URI: '172.16.12.223:27017',
    REPLICA_SET: null,
    DB_USERNAME: 'qa-masspay-v2-test',
    DB_PASSWORD_ENCRYPTED: 'A81BNtQhjMJ6nHIfG/x65opsuqwIgGjfuCtmFYZR+oDNOV9vodUgkA3it3ea1g4gHcezdtcYMXMQ18VxdzUrh1UZxgJ7rx+583CXV9u3eJF+19TagTQjdzgOSEPwWkruEBH2ktJf0YHDkkQRW7oQc71W',
    DB_CONNECTION_STRING: deferConfig(() => {
      return `mongodb://${config.mongoose.DB_USERNAME}:${EncryptionService.decrypt(config.mongoose.DB_PASSWORD_ENCRYPTED)}@${config.mongoose.DB_URI}/${config.mongoose.DB}`;
    }),
  },
  redis: {
    URI: 'preprodrediscluster.lydffc.0001.euw1.cache.amazonaws.com',
    PORT: 6379,
    ENCRYPTED_PASSWORD: null,
    PASSWORD: deferConfig(() => EncryptionService.decrypt(config.redis.ENCRYPTED_PASSWORD)),
  },
  notifications: {
    NOTIFICATION_SERVICE_ENABLED: true,
    NOTIFICATION_ENDPOINT: 'http://172.16.11.222:4751/api/v1',
    NOTIFICATION_SECRET_KEY_ENCRYPTED: 'yohD7/8MpgJADeGnBeRtkDUbMvJpOkisuuG2X77TgDV+ZW6cAKqnAgswj/zhEgchihl1kw2xx8ZJampyEtWsQPt4MsUZuC390zrt7/Vhw8W/xzeANqusU91CXeo20jAH1s4/hsdn+ewhvTTR/HYjWx/w9aiK1UakEyao4Kc=',
    NOTIFICATION_SECRET_KEY: deferConfig(() => EncryptionService.decrypt(config.notifications.NOTIFICATION_SECRET_KEY_ENCRYPTED)),
    MAIL_ERRORS_TO: [],
  },
};

export default config;
