import { Inject, Injectable } from '@nestjs/common';
import { Wallet } from '../../database/schemas/wallet.schema';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletType } from 'src/database/schemas/wallet-types.schema';
import { Bank } from 'src/database/schemas/bank.schema';

@Injectable()
export class WalletService {
  @Inject('WALLETS_REPOSITORY')
  private walletRepository: typeof Wallet;

  @Inject('WALLETS_TYPE_REPOSITORY')
  private walletTypeRepository: typeof WalletType;

  async create(profileId: number, wallet: CreateWalletDto) {
    const result = await this.walletRepository.create({
      ...wallet,
      profileId,
    });

    return result;
  }

  async getAll(profileId: number): Promise<Wallet[]> {
    return this.walletRepository.findAll({ where: { profileId }, include: [Bank, WalletType] });
  }

  async getById(id: number): Promise<Wallet> {
    return this.walletRepository.findOne({ where: { id } });
  }

  async getWalletTypes(): Promise<WalletType[]> {
    return this.walletTypeRepository.findAll();
  }
}
