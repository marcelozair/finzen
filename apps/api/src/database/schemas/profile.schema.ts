import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from './user.schema';
import { Wallet } from './wallet.schema';
import { Transaction } from './transactions.schema';

@Table({
  tableName: 'profiles',
})
export class Profile extends Model {
  @Column
  name: string;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Wallet)
  wallets: Wallet[];

  @HasMany(() => Transaction)
  profile: Transaction[];
}
