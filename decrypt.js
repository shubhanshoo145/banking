require('reflect-metadata');
const service = require('./dist/components/application/encryption.service');
console.log(service.EncryptionService.decrypt(process.argv[2], process.argv[3]));