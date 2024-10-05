import { Response } from 'express';
import { Body, Controller, Get, Inject, Post, Res, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { User } from '../../database/schemas/user.schema';
import { GetUser } from 'src/common/decorators/user.decorators';

@Controller('wallet')
export class WalletController {
  @Inject()
  private walletService: WalletService;

  @UseGuards(AuthGuard)
  @Post('create')
  async createWallet(
    @Res() res: Response,
    @Body() wallet: CreateWalletDto,
    @GetUser() user: User,
  ) {
    if (!user.profileId) {
      return res.status(400).json({
        success: false,
        message: 'User has not profile',
      });
    }

    const response = await this.walletService.create(user.profileId, wallet);

    return res.json({
      success: true,
      message: 'Wallet created succesful',
      data: response,
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll(
    @Res() res: Response,
    @GetUser() user: User,
  ) {
    const response = await this.walletService.getAll(user.profileId);

    return res.json({
      success: true,
      message: 'successful',
      data: response,
    });
  }
  
  @UseGuards(AuthGuard)
  @Get('types')
  async getTypes(@Res() res: Response) {
    const response = await this.walletService.getWalletTypes();

    return res.json({
      success: true,
      message: 'successful',
      data: response,
    });
  }
}
