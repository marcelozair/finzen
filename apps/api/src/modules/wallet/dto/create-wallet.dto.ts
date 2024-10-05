import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  bankId: number;

  @IsNumber()
  typeId: number;

  @IsOptional()
  @IsString()
  accountNumber: string;

  @IsNumber()
  @IsOptional()
  closingDate: number;

  @IsNumber()
  @IsOptional()
  dueDate: number;

  @IsNumber()
  balance: number;

  @IsString()
  @IsOptional()
  color: string;
}
