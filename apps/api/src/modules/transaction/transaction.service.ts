import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Transaction, TransactionType } from 'src/database/schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction';
import { WalletService } from '../wallet/wallet.service';
import { IGetWithPagination } from './transaction.interface';

@Injectable()
export class TransactionService {
  @Inject('TRANSACTION_REPOSITORY')
  private transactionRepository: typeof Transaction;

  @Inject(WalletService)
  private walletService: WalletService;

  async createTransaction(body: CreateTransactionDto, profileId: number) {
    const wallet = await this.walletService.getById(body.walletId);

    if (!wallet) throw new NotFoundException('wallet not found');

    console.log({
      ...body,
      profileId: profileId,
    })

    const transaction = await this.transactionRepository.create({
      ...body,
      profileId: profileId,
    });

    if (body.type === TransactionType.INCOME) wallet.balance += body.amount;
    else wallet.balance -= body.amount;

    await wallet.save();

    return transaction;
  }

  async getWithPagination(
    profileId: number,
    walletId: number,
    page: number,
    limit: number
  ): Promise<IGetWithPagination> {
    const transactions = await this.transactionRepository.findAll({
      where: { profileId, walletId },
      offset: limit * (page - 1),
      limit,
      order: [['createdAt', 'desc']]
    });

    const total = await this.transactionRepository.count();

    return ({
      list: transactions,
      total,
      page,
    });
  }
}
