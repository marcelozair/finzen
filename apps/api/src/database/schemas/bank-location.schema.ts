import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Bank } from './bank.schema';

@Table({
  tableName: 'banks_location',
})
export class BankLocation extends Model {
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  location: string;

  @ForeignKey(() => Bank)
  @Column({ field: 'bank_id' })
  bankId: number;

  @BelongsTo(() => Bank)
  bank: Bank;
}
