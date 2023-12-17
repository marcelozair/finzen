import {
  Table,
  BelongsTo,
  ForeignKey,
  DataType,
  Column,
  Model,
} from 'sequelize-typescript';
import { Wallet } from './wallet.schema';
import { Profile } from './profile.schema';
import { TransactionPlace } from './transactionPlace.schema';

@Table({
  tableName: 'transactions',
})
export class Transaction extends Model {
  @Column
  concept: string;

  @Column({
    type: DataType.FLOAT,
  })
  amount: number;

  @Column
  isIncome: boolean;

  @ForeignKey(() => Wallet)
  @Column({ field: 'wallet_id' })
  walletId: number;

  @BelongsTo(() => Wallet)
  wallet: Wallet;

  @ForeignKey(() => Profile)
  @Column({ field: 'account_id' })
  accountId: number;

  @BelongsTo(() => Profile)
  profile: Wallet;

  @ForeignKey(() => TransactionPlace)
  @Column({ field: 'place_id' })
  transactionPlaceId: number;

  @BelongsTo(() => TransactionPlace)
  transactionPlace: TransactionPlace;
}
