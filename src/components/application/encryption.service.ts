import { createCipheriv, createDecipheriv, pbkdf2Sync, randomBytes } from 'crypto';

export class EncryptionService {
  public static encrypt(text: string, masterKey = process.env.MASTER_KEY): string {
    try {
      const iv = randomBytes(16);
      const salt = randomBytes(64);
      const key = pbkdf2Sync(masterKey, salt, 65536, 32, 'sha512');
      const cipher = createCipheriv('aes-256-gcm', key, iv);
      const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
      const tag = cipher.getAuthTag();
      return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
    } catch (error) {
      return text;
    }
  }

  public static decrypt(data: string, masterKey = process.env.MASTER_KEY): string {
    try {
      const bData = Buffer.from(data, 'base64');
      const salt = bData.slice(0, 64);
      const iv = bData.slice(64, 80);
      const tag = bData.slice(80, 96);
      const text = bData.slice(96);
      const key = pbkdf2Sync(masterKey, salt , 65536, 32, 'sha512');
      const decipher = createDecipheriv('aes-256-gcm', key, iv);
      decipher.setAuthTag(tag);
      const decrypted = decipher.update(text, 'binary', 'utf8') + decipher.final('utf8');
      return decrypted;
    } catch (error) {
      return data;
    }
  }
}
