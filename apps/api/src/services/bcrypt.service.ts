import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService {
  encrypt(value: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(value, salt);

    return hash;
  }

  compare(value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash)
  }
}
