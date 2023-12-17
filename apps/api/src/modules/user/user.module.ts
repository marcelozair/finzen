import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserProviderRepository } from 'src/database/providers/user.provider';
import { AppModule } from 'src/app.module';
import { BcryptService } from 'src/services/bcrypt.service';

@Module({
  providers: [UserProviderRepository, BcryptService, UserService],
  exports: [UserService]
})
export class UserModule {}
