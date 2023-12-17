import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Bank } from './bank.schema';

@Table({
  tableName: 'bank_places',
})
export class BankPlace extends Model {
  @Column
  name: string;

  @Column
  location: string;

  @ForeignKey(() => Bank)
  @Column({ field: 'bank_id' })
  bankId: number;

  @BelongsTo(() => Bank)
  bank: Bank;
}
