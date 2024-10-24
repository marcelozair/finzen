import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
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

  @IsNumber()
  @IsOptional()
  categoryId: null | number;
}
