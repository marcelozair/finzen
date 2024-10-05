import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { TransactionType } from 'src/database/schemas/transaction.schema';

export class CreateTransactionDto {
  @IsString()
  concept: string;

  @IsNumber()
  amount: number;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNumber()
  walletId: number;
}
