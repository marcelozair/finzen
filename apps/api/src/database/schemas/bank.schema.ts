import { Table, Column, Model, HasMany } from 'sequelize-typescript';

import { Wallet } from './wallet.schema';
import { BankPlace } from './bankPlace.schema';

@Table({
  tableName: 'banks',
})
export class Bank extends Model {
  @Column
  name: string;

  @HasMany(() => BankPlace)
  places: BankPlace[];

  @HasMany(() => Wallet)
  wallets: Wallet[];
}
