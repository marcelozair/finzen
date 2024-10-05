import { Response } from 'express';
import { Body, HttpStatus, Inject, Post } from '@nestjs/common';
import { Controller, Res, HttpCode, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../user/user.service';
import { CreateAccountDto } from './dto/create-profile';
import { User } from '../../database/schemas/user.schema';
import { ProfileService } from '../profile/profile.service';
import { GetUser } from 'src/common/decorators/user.decorators';
import { WalletService } from '../wallet/wallet.service';

@Controller('profile')
export class ProfileController {
  @Inject(ProfileService)
  private readonly profileService: ProfileService;

  @Inject(WalletService)
  private readonly walletService: WalletService;

  @Inject(UserService)
  private readonly userService: UserService;

  @UseGuards(AuthGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createProfileAccount(
    @Res() res: Response,
    @Body() { name }: CreateAccountDto,
    @GetUser() user: User,
  ) {
    const profile = await this.profileService.createProfile(name, user);
    await this.userService.updateUser(user.id, { profileId: profile.id });

    await this.walletService.create(profile.id, {
      accountNumber: null,
      bankId: null,
      closingDate: null,
      color: '#2A7B29',
      name: 'Efectivo',
      balance: 0,
      dueDate: null,
      typeId: 1,
    });

    return res.json({
      success: true,
      message: 'Profile created succesful',
      data: profile,
    });
  }
}
