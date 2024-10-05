import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { UserModule } from '../user/user.module';
import { WalletController } from './wallet.controller';
import { WalletProviderRepository } from '../../database/providers/wallet.provider';
import { WalletTypeProviderRepository } from 'src/database/providers/wallet-type.provider';

@Module({
  imports: [UserModule],
  providers: [WalletProviderRepository, WalletTypeProviderRepository, WalletService],
  controllers: [WalletController],
  exports: [WalletService],
})
export class WalletModule {}
