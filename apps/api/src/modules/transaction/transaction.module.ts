import { Module } from '@nestjs/common';
import { TransactionProviderRepository } from 'src/database/providers/transaction.provider';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/wallet.module';
import { WalletService } from '../wallet/wallet.service';
import { WalletProviderRepository } from 'src/database/providers/wallet.provider';
import { WalletTypeProviderRepository } from 'src/database/providers/wallet-type.provider';

@Module({
  imports: [UserModule, WalletModule],
  controllers: [TransactionController],
  providers: [TransactionProviderRepository, WalletProviderRepository, WalletTypeProviderRepository, TransactionService, WalletService],
  exports: []
})
export class TransactionModule {}
