import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankProviderRepository } from '../../database/providers/bank.provider';
import { BankController } from './bank.controller';

@Module({
  controllers: [BankController],
  providers: [BankProviderRepository, BankService],
  exports: [BankService]
})
export class BankModule {}
