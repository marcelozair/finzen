import { Body, Controller, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { GetUser } from 'src/common/decorators/user.decorators';
import { User } from '../../database/schemas/user.schema';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('wallet')
export class WalletController {
  @Inject()
  private walletService: WalletService;

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createWallet(
    @Res() res: Response,
    @Body() wallet: CreateWalletDto,
    @GetUser() user: User,
  ) {
    const response = await this.walletService.create(wallet, user.id);

    return res.json({
      success: true,
      message: '',
      data: response,
    });
  }
}
