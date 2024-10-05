import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';

import { Wallet } from './wallet.schema';

@Table({
  tableName: 'wallet_types',
})
export class WalletType extends Model {
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  icon: string;

  @Column({ type: DataType.STRING })
  color: string;

  @HasMany(() => Wallet)
  wallets: Wallet[];
}
