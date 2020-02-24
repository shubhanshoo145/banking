// setting environment
const env = require('./env');

if (env == null) {
  throw new Error('ENV not found');
}
process.env.NODE_ENV = env.NODE_ENV;

if (process.env.NODE_ENV === 'development') {
  process.env.PORT = 4703;
  process.env.LOGGER_LEVEL = 'debug';
  process.env.DB = 'masspay-v2-staging';
  process.env.DB_URI = 'localhost';
  process.env.JWT_SECRET = 'masspay-v2-reuters-rate';
} else if (process.env.NODE_ENV === 'staging') {
  process.env.PORT = 4703;
  process.env.LOGGER_LEVEL = 'info';
  process.env.DB = 'masspay-v2-test';
  process.env.DB_URI = 'localhost';
} else if (process.env.NODE_ENV === 'test') {
  process.env.PORT = 4703;
  process.env.LOGGER_LEVEL = 'debug';
  process.env.DB = 'masspay-v2-test';
  process.env.DB_URI = 'adminMasspay:Instarem1!@161.202.19.190:27017';
} else if (process.env.NODE_ENV === 'qa') {
  process.env.PORT = 4703;
  process.env.LOGGER_LEVEL = 'debug';
  process.env.DB = 'masspay-v2-test';
  process.env.DB_URI = 'qa-masspay-v2-test:CGCCH7dqSg8XNUkXcG@192.168.2.223:27017';
} else if (process.env.NODE_ENV === 'preprod') {
  process.env.PORT = 4703;
  process.env.LOGGER_LEVEL = 'debug';
  process.env.DB = 'masspay-v2-test?replicaSet=instareplica';
  process.env.DB_URI = 'preprodappuser:XGM6FzmpbuFWFc6e@mongo-uatcluster1.internal.instarem.com:27017,mongo-uatcluster2.internal.instarem.com:27017,mongo-uatcluster3.internal.instarem.com:27017';
} else if (process.env.NODE_ENV === 'production') {
  process.env.PORT = 4703;
  process.env.LOGGER_LEVEL = 'debug';
  process.env.DB = 'masspay-v2-production?replicaSet=instareplica';
  process.env.DB_URI = 'app-masspay-v2-production:84gh2ggLVCqAC5a7Qr@mongoprod-node-1.internal.instarem.com:27017,mongoprod-node-2.internal.instarem.com:27017,mongoprod-node-3.internal.instarem.com:27017';
  process.env.JWT_SECRET = 'masspay-v2-reuters-rate';
}