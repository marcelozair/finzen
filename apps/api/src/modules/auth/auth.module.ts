import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { ProfileModule } from '../profile/profile.module';
import { BcryptService } from 'src/services/bcrypt.service';
import { UserProviderRepository } from '../../database/providers/user.provider';

console.log('SECRET', process.env.JWT_SECRET);

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    ProfileModule,
    JwtModule.register({
      global: true,
      secret: '1dEIHe12tCtO',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UserProviderRepository, BcryptService, AuthService],
})
export class AuthModule {}
