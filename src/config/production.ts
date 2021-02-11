import 'reflect-metadata';
import { deferConfig } from 'config/defer';
import { EncryptionService } from '../components/application/encryption.service';
import { IServiceConfig } from '../commons/interfaces/config/IServiceConfig';

const config: Pick<IServiceConfig, 'mongoose' | 'notifications' | 'redis'> = {
  mongoose: {
    DB: 'masspay-v2-production',
    DB_URI: 'send-prod-cluster.dkvup.mongodb.net',
    DB_USERNAME: 'app-masspay-v2-production',
    REPLICA_SET: undefined,
    DB_PASSWORD_ENCRYPTED: 'd6JF8K44wT4wp6/lZ+OR5vJJwCNSpCSOndl/Pf2qjr2MQ74P9SRO2jippFjODu6HGIU7Do2UFazWgT3uoHVM3Z3F3+W3s9hYCSK5yhylVr668tr6L/8fVYxgKhtQekwZXdLkz5SiOmvgQFXcKAJApg==',
    DB_CONNECTION_STRING: deferConfig(() => {
      return `mongodb+srv://${config.mongoose.DB_USERNAME}:${EncryptionService.decrypt(config.mongoose.DB_PASSWORD_ENCRYPTED)}@${config.mongoose.DB_URI}/${config.mongoose.DB}?retryWrites=true&w=majority`;
    }),
  },
  notifications: {
    NOTIFICATION_SERVICE_ENABLED: true,
    NOTIFICATION_ENDPOINT: 'http://internal-InstaremNotificationLB-319333594.eu-west-1.elb.amazonaws.com:4751/api/v1',
    NOTIFICATION_SECRET_KEY_ENCRYPTED: 'fOQuQsVh/XOUCXjb0HEvlYEKWxONclmvzn0E8ZrNhj57M0pRxL2n6dGP/+UIarPZr229MIOrg4RHn14g1fjcxRu374VCPdPjQJG+/R5wuvOtVLZXyX77WX3luiS8Wqsd9H06f1xxt5eWuChHQNFx3g3gCRs9Cc38uY7NLFg=',
    NOTIFICATION_SECRET_KEY: deferConfig(() => EncryptionService.decrypt(config.notifications.NOTIFICATION_SECRET_KEY_ENCRYPTED)),
    MAIL_ERRORS_TO: ['dev_vilnius@instarem.com', 'amber.rai@instarem.com'],  },
  redis: {
    URI: 'prodrediscluster.jeclmu.ng.0001.euw1.cache.amazonaws.com',
    PORT: 6379,
    ENCRYPTED_PASSWORD: null,
    PASSWORD: deferConfig(() => EncryptionService.decrypt(config.redis.ENCRYPTED_PASSWORD)),
  },
};

export default config;
