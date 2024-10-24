import { Table, Column, Model, HasMany } from 'sequelize-typescript';

import { Transaction } from './transaction.schema';

@Table({
  tableName: 'categories',
})
export class Category extends Model {
  @Column
  name: string;

  @Column
  icon: string;

  @Column
  color: string;

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
