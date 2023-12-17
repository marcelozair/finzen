import { IsEnum, IsNumber, IsString } from 'class-validator';
import { EnumWalletType } from 'src/database/schemas/wallet.schema';

export class CreateWalletDto {
  @IsString()
  name: string;

  @IsEnum(EnumWalletType)
  type: string;

  @IsNumber()
  balance: number;

  @IsString()
  accountNumber: string;

  @IsString()
  closingDate: string;

  @IsString()
  dueDate: string;

  @IsString()
  color: string;

  @IsNumber()
  bankId: number;
}
