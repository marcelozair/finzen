import { Response } from 'express';
import { Body, HttpStatus, Inject, Post } from '@nestjs/common';
import { Controller, Res, HttpCode, UseGuards } from '@nestjs/common';

import { CreateAccountDto } from './dto/create-profile';
import { User } from '../../database/schemas/user.schema';
import { ProfileService } from '../profile/profile.service';
import { GetUser } from 'src/common/decorators/user.decorators';
import { AuthGuard } from '../auth/auth.guard';

// #TODO assign profile by defauly when user create a new profile

@Controller('profile')
export class ProfileController {
  @Inject(ProfileService)
  private readonly profileService: ProfileService;

  @UseGuards(AuthGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createProfileAccount(
    @Res() res: Response,
    @Body() { name }: CreateAccountDto,
    @GetUser() user: User,
  ) {
    const profile = await this.profileService.createProfile(name, user);

    return res.json({
      success: true,
      message: 'Profile created succesful',
      data: profile,
    });
  }
}
