const CryptoJS = require('crypto-js');
const { server } = require('../config');

function authorization(router) {
  router.use((req, res, next) => {
    const encryptionKey = req.headers && req.headers.authorization ? req.headers.authorization : '';
    // Encrypt
    // const ciphertext = CryptoJS.AES.encrypt(server.reutersServiceMessage, server.reutersServiceSecret);
    // Decrypt
    const bytes = CryptoJS.AES.decrypt(encryptionKey, server.reutersServiceSecret);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    if (plaintext === server.reutersServiceMessage) {
      return next();
    }
    return res.json({ success: false, message: 'Authorization header is incorrect' });
  });
}

module.exports = authorization;