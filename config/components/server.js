const joi = require('joi');

const envVarsSchema = joi.object({
    NODE_ENV: joi.string()
      .allow(['development', 'production', 'test', 'provision', 'preprod'])
      .required(),
    PORT: joi.number()
      .required(),
  }).unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  isTest: envVars.NODE_ENV === 'test' || envVars.NODE_ENV === 'qa' || envVars.NODE_ENV === 'preprod',
  isDevelopment: envVars.NODE_ENV === 'development',
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  allowedIpAddress: ['127.0.0.1', '54.76.218.89', '34.240.118.197', '161.202.19.190', '161.202.19.184', '168.1.88.245', '103.19.197.218', '49.248.69.14', '119.81.45.114', '119.81.45.123', '10.0.1.214', '10.0.1.83', '10.0.0.49', '172.16.0.246', '52.31.195.126', '192.168.2.220', '192.168.2.221'],
  reutersServiceMessage: 'comsumingreutersrateservice',
  reutersServiceSecret: 'Ins#ta@re!m1771%90',
};

module.exports = config;
