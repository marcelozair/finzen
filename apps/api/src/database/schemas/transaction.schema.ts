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
import { TransactionLocation } from './transaction-location.schema';

export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
  TRANSFER = "transfer"
}

@Table({
  tableName: 'transactions',
})
export class Transaction extends Model {
  @Column({ type: DataType.STRING })
  concept: string;

  @Column({ type: DataType.FLOAT })
  amount: number;

  @Column({ type: DataType.STRING })
  type: TransactionType;

  @ForeignKey(() => Wallet)
  @Column({ field: 'wallet_id' })
  walletId: number;

  @BelongsTo(() => Wallet)
  wallet: Wallet;

  @ForeignKey(() => Profile)
  @Column({ field: 'account_id' })
  profileId: number;

  @BelongsTo(() => Profile)
  profile: Wallet;

  @ForeignKey(() => TransactionLocation)
  @Column({ field: 'place_id', allowNull: true })
  transactionPlaceId: number | null;

  @BelongsTo(() => TransactionLocation)
  transactionPlace: TransactionLocation | null;
}
