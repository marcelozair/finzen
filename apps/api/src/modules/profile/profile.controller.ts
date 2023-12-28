import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Body, HttpStatus, Inject, Post } from '@nestjs/common';
import { Controller, Res, HttpCode, UseGuards } from '@nestjs/common';

import { User } from '../../database/schemas/user.schema';
import { CreateAccountDto } from './dto/create-profile';
import { ProfileService } from '../profile/profile.service';
import { GetUser } from 'src/common/decorators/user.decorators';

@Controller('profile')
export class ProfileController {
  @Inject(ProfileService)
  private readonly profileService: ProfileService;

  @UseGuards(AuthGuard('jwt'))
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
