import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { WalletProviderRepository } from '../../database/providers/wallet.provider';

@Module({
  providers: [WalletProviderRepository, WalletService],
  controllers: [WalletController],
})
export class WalletModule {}
