import * as bcrypt from 'bcrypt';
import { injectable } from 'inversify';

@injectable()
export class PasswordHasher {
  public generateHash(password: string) {
    const SALT_ROUND = 10;
    return bcrypt.hashSync(password, SALT_ROUND);
  }
  public comparePasswordWithHash(plainTextInput, passwordHash) {
    return bcrypt.compareSync(plainTextInput, passwordHash);
  }
}