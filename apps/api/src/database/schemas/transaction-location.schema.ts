import { Transaction } from './transaction.schema';
import { Table, Column, Model, HasMany } from 'sequelize-typescript';

@Table({
  tableName: 'transactions_location',
})
export class TransactionLocation extends Model {
  @Column
  name: string;

  @Column
  location: string;

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
