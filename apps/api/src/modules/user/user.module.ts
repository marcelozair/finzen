import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { BcryptService } from 'src/services/bcrypt.service';
import { UserProviderRepository } from 'src/database/providers/user.provider';

@Module({
  providers: [UserProviderRepository, BcryptService, UserService],
  exports: [UserService]
})
export class UserModule {}
