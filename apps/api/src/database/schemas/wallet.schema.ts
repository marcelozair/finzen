import {
  Column,
  DataType,
  Table,
  Model,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Bank } from './bank.schema';
import { Profile } from './profile.schema';
import { Transaction } from './transaction.schema';
import { WalletType } from './wallet-types.schema';

@Table({
  tableName: 'wallets',
})
export class Wallet extends Model {
  @Column
  name: string;

  @ForeignKey(() => WalletType)
  @Column({ type: DataType.INTEGER })
  typeId: number;

  @Column({
    type: DataType.FLOAT,
  })
  balance: number;

  @Column({ field: 'account_number' })
  accountNumber: string;

  @Column({ field: 'due_date', allowNull: true })
  dueDate: number;

  @Column({ field: 'closing_date', allowNull: true })
  closingDate: number;

  @Column({ defaultValue: '#000000' })
  color: string;

  @HasMany(() => Transaction)
  transactions: Transaction[];

  @ForeignKey(() => Profile)
  @Column({ field: 'profile_id' })
  profileId: number;

  @BelongsTo(() => Profile)
  profile: Profile;

  @ForeignKey(() => Bank)
  @Column({ field: 'bank_id' })
  bankId: number;

  @BelongsTo(() => Bank)
  bank: Bank;

  @BelongsTo(() => WalletType)
  type: WalletType;
}
