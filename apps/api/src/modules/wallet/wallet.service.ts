import { Inject, Injectable } from '@nestjs/common';
import { Wallet } from '../../database/schemas/wallet.schema';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Injectable()
export class WalletService {
  @Inject('WALLETS_REPOSITORY')
  private walletRepository: typeof Wallet;

  async create(wallet: CreateWalletDto, userId: number) {
    const result = await this.walletRepository.create({
      ...wallet,
      userId: userId,
    });

    return result;
  }
}
