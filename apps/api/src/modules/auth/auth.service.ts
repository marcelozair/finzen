import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

import { ITokenPayload } from './auth.types';
import { BcryptService } from 'src/services/bcrypt.service';
import { User } from 'src/database/schemas/user.schema';

@Injectable()
export class AuthService {
  @Inject(BcryptService)
  private readonly bcryptService: BcryptService

  @Inject(JwtService)
  private readonly jwtService: JwtService

  @Inject(ConfigService)
  private readonly configService: ConfigService


  validatePassword(hashPassword: string, password: string): boolean {
    return this.bcryptService.compare(hashPassword, password);
  }

  async encryptToken(user: User): Promise<string> {
    return this.jwtService.sign(user.toJSON() as ITokenPayload, { expiresIn: '1d' });
  }

  async decryptToken(token: string): Promise<ITokenPayload> {
    const JWT_SECRET = this.configService.get<string>('JWT_SECRET');
    return this.jwtService.verify(token, { secret: JWT_SECRET })
  }
}
