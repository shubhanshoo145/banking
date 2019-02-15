const joi = require('joi');

const envVarsSchema = joi.object({
    DB: joi.string().valid(['masspay-v2-test', 'masspay-v2-staging', 'masspay-v2-production', 'masspay-v2-production?replicaSet=instareplica', 'masspay-v2-development']).required(),
    DB_URI: joi.string().required(),
  }).unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  db: envVars.DB,
  dbURI: envVars.DB_URI,
  connectionString: `mongodb://${envVars.DB_URI}/${envVars.DB}`,
};

module.exports = config;