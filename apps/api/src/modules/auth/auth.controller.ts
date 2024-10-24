import { Response } from 'express';
import { Body, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { Controller, Res, HttpCode, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { ProfileService } from '../profile/profile.service';
import { GetUser } from 'src/common/decorators/user.decorators';
import { User } from 'src/database/schemas/user.schema';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(ProfileService)
  private readonly profileService: ProfileService;
  
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Res() res: Response, @Body() body: RegisterDto) {
    const user = await this.userService.createUser(body);

    const token = await this.authService.encryptToken(user);

    delete user.password;

    return res.json({ message: 'user created', user, token });
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Res() res: Response, @Body() body: SignInDto) {
    const { password, email } = body;

    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException('Your email or password is invalid');

    const validPassword = this.authService.validatePassword(password, user.password);
    if (!validPassword) throw new UnauthorizedException('Your email or password is invalid');

    const token = await this.authService.encryptToken(user);

    delete user.password;

    if (user.profileId) {
      const profile = await this.profileService.getProfile(user.profileId);
      user.profile = profile;
    }

    await this.userService.updateLastLogin(user);

    return res.json({ message: 'user loggin successful', token, user });
  }


  @Post('session')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async session(@Res() res: Response, @GetUser() user: User) {
    const userFound = await this.userService.findById(user.id);

    if (userFound.profileId) {
      const profile = await this.profileService.getProfile(userFound.profileId);
      userFound.profile = profile;
    }
  
    const token = await this.authService.encryptToken(userFound);

    delete userFound.password;

    return res.json({ message: 'user generate token successful', token, user: userFound });
  }
}
