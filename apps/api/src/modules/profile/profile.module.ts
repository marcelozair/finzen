import { Module } from '@nestjs/common';

import { ProfileController } from './profile.controller';
import { ProfileService } from '../profile/profile.service';
import { ProfileProviderRepository } from '../../database/providers/profile.provider';
import { UserProviderRepository } from '../../database/providers/user.provider';
import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [UserModule, WalletModule],
  controllers: [ProfileController],
  providers: [
    ProfileProviderRepository,
    UserProviderRepository,
    ProfileService,
  ],
  exports: [ProfileService]
})
export class ProfileModule {}
