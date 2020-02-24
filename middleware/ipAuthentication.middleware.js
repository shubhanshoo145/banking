const { allowedIpAddress } = rootRequire('config').server;
const { IpDeniedError } = rootRequire('commons').ERROR;

function ipAuthentication(router) {
  router.use((req, res, next) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let isIpAuthenticated = false;
    isIpAuthenticated = allowedIpAddress.some((v) => {
      return clientIp.indexOf(v) > -1;
    });
    // logger.info(`IP Authenticated: ${isIpAuthenticated}`);
    // IpWhitelisted only in remit route.
    if (!isIpAuthenticated) {
      return next(new IpDeniedError(`UnAuthorised to access this API | clientIp: ${clientIp}`));
    }
    return next();
  });
}

module.exports = ipAuthentication;