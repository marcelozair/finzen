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
import { Transaction } from './transactions.schema';

export enum EnumWalletType {
  CREDIT = 'credit',
  DEBIT = 'debit',
  SERVICE = 'service',
  CASH = 'cash',
}

@Table({
  tableName: 'wallet',
})
export class Wallet extends Model {
  @Column
  name: string;

  @Column({
    defaultValue: EnumWalletType.CASH,
    type: DataType.ENUM(...Object.values(EnumWalletType)),
  })
  type: EnumWalletType;

  @Column({
    type: DataType.FLOAT,
  })
  balance: number;

  @Column
  accountNumber: string;

  @Column({ field: 'closing_date', allowNull: true })
  closingDate: Date;

  @Column({ field: 'due_date', allowNull: true })
  dueDate: Date;

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
}
