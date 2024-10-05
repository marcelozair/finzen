import { Table, Column, Model, HasMany } from 'sequelize-typescript';

import { Wallet } from './wallet.schema';

@Table({
  tableName: 'banks',
})
export class Bank extends Model {
  @Column
  name: string;

  @Column
  alias: string;

  @Column
  icon: string;

  @Column
  color: string;

  @HasMany(() => Wallet)
  wallets: Wallet[];
}
