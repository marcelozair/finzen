import { Response } from 'express';
import { Controller, Res, HttpCode, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Body, HttpStatus, Inject, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { ProfileService } from '../profile/profile.service';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(ProfileService)
  private readonly profileService: ProfileService;
  
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Res() res: Response, @Body() body: RegisterDto) {
    const user = await this.userService.createUser(body);

    const token = await this.authService.encryptToken(user.id);

    delete user.password;

    return res.json({ message: 'user created', user, token });
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Res() res: Response, @Body() body: SignInDto) {
    const { password, email } = body;

    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException('user not exist');

    const validPassword = this.authService.validatePassword(password, user.password)
    if (!validPassword) throw new UnauthorizedException('wrong password');

    const token = await this.authService.encryptToken(user.id);

    delete user.password;

    if (user.profileSelected) {
      const profile = await this.profileService.getProfile(user.profileSelected);
      user.profile = profile;
    }

    return res.json({ message: 'user loggin successful', token, user });
  }
}
