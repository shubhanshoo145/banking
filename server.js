// Starting an API Server to expose functinalities
const { express, server } = require('./config');

const app = express();

require('./web')(app);
require('./handlerError')(app);

app.listen(server.port, (err) => {
  if (err) {
    logger.error(`Error while starting server at port ${server.port} | Error: ${err.message}`);
  }
  logger.info(`Express Server Up and Running @PORT: ${server.port} | at localhost`);
});

module.exports = app;