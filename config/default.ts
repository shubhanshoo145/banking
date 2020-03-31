import 'reflect-metadata';
import { deferConfig } from 'config/defer';
import { EncryptionService } from '../components/application/encryption.service';
import { IServiceConfig } from '../commons/interfaces/config/IServiceConfig';

const config: IServiceConfig = {
  mongoose: {
    DB: 'masspay-v2-staging',
    DB_URI: 'host.docker.internal:27017',
    DB_USERNAME: null,
    DB_PASSWORD_ENCRYPTED: null,
    DB_CONNECTION_STRING: deferConfig(() => `mongodb://${config.mongoose.DB_URI}/${config.mongoose.DB}`),
  },
  redis: {
    URI: 'host.docker.internal',
    PORT: 6379,
    PASSWORD: deferConfig(() => EncryptionService.decrypt(config.redis.ENCRYPTED_PASSWORD)),
    ENCRYPTED_PASSWORD: 'RwAqz8c8F9J6JnqkthtB+axOFKXaSiVQzPzOErhB3UJXIhdkjVX87CC/N5e3/g4clCqCloeIe2TH+ozbskKuknn1CXlfiP7HlU0mokxp/W1HWcp7S/5oqzPpzVSwu1EdyeSIVM3VKh5u9Q==',
  },
  httpServer: {
    PORT: 4703,
  },
  reuters: {
    REUTERS_TOKEN_URL: 'https://api.rkd.reuters.com/api/TokenManagement/TokenManagement.svc/REST/Anonymous/TokenManagement_1/CreateServiceToken_1',
    REUTERS_RATE_URL: 'http://api.rkd.reuters.com/api/Quotes/Quotes.svc/REST/Quotes_1/RetrieveItem_3',
    REUTERS_APPLICATION_ID: 'PrajitInstaremCom',
    REUTERS_USERNAME: 'prajit@instarem.com',
    REUTERS_PASSWORD: 'Instarem123'
  },
  middleware: {
    AUTH_KEY: 'Ins#ta@re!m1771%90',
    AUTH_SECRET: 'comsumingreutersrateservice',
    WHITELISTED_IPS: [
      '127.0.0.1',
      '54.76.218.89',
      '34.240.118.197',
      '161.202.19.190',
      '161.202.19.184',
      '168.1.88.245',
      '103.19.197.218',
      '49.248.69.14',
      '119.81.45.114',
      '119.81.45.123',
      '10.0.1.214',
      '10.0.1.83',
      '10.0.0.49',
      '172.16.0.246',
      '52.31.195.126',
      '192.168.2.220',
      '192.168.2.221',
    ],
    WHITELISTED_SUBNETS: [
      /172\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/i,
    ]
  },
  application: {
    EXPIRY_MINUTES: 15,
  }
};

export default config;
