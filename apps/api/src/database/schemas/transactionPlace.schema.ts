import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Transaction } from './transactions.schema';

@Table({
  tableName: 'transaction_places',
})
export class TransactionPlace extends Model {
  @Column
  name: string;

  @Column
  location: string;

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
