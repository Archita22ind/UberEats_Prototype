const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(3000),
    NODE_PORT: Joi.number(),
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    SECRET_KEY: Joi.string().required().description("Secret Key"),
    ACCESS_KEY_ID: Joi.string().required().description("AWS access KeyID"),
    SECRET_ACCESS_KEY: Joi.string()
      .required()
      .description("AWS secret Access Key"),
    BUCKET: Joi.string().required().description("AWS access KeyID"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: envVars.PORT,
  AWSAccessKeyId: envVars.ACCESS_KEY_ID,
  AWSSecretAccessKey: envVars.SECRET_ACCESS_KEY,
  AWSBucket: envVars.BUCKET,
  env: envVars.NODE_ENV,
  node_Port: envVars.NODE_PORT,
  secret_key: envVars.SECRET_KEY,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 500,
      wtimeoutMS: 2500,
    },
  },
};
