const {
  ValidationError,
  ApplicationError,
  AuthorizationError,
  IpDeniedError
} = require('./commons').ERROR;

function errorHelper(err) {

  const obj = {
    name: err.name,
    message: err.message,
    status: 0,
    errorResponse: {},
  };


  if (err instanceof ValidationError) {
    obj.status = 400; // Bad Request
  } else if (err instanceof AuthorizationError) {
    obj.status = 401; // Unauthorised
  } else if (err instanceof ApplicationError) {
    obj.status = 500; // Internal Server Error
  } else if (err instanceof IpDeniedError) {
    obj.status = 200;
  } else {
    obj.status = 500;
  }

  return obj;
}

module.exports = function (app) {
  app.use((err, req, res, next) => {
    const error = errorHelper(err);
    logger.error(`Error name: ${error.name} | message: ${error.message} | status: ${error.status}`);
    res.json({ success: false, message: error.message });
  });
};