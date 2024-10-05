import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { IUserCreate, IUserUpdate } from './user.types';
import { BcryptService } from 'src/services/bcrypt.service';
import { EnumProvider, User } from '../../database/schemas/user.schema';

@Injectable()
export class UserService {
  @Inject('USERS_REPOSITORY')
  private userRepository: typeof User;

  @Inject(BcryptService)
  private readonly bcryptService: BcryptService

  async createUser(payload: IUserCreate): Promise<User> {
    const { email, name, password } = payload;

    const userFound = await this.userRepository.findOne({ where: { email } });

    if (userFound) throw new BadRequestException('User already exist');

    const hashPassword = this.bcryptService.encrypt(password);

    const user = await this.userRepository.create({
      name,
      email,
      sub: '',
      picture: null,
      password: hashPassword,
      provider: EnumProvider.LOCAL
    });

    return user;
  }

  async updateUser(id: number, payload: IUserUpdate): Promise<void> {
    await this.userRepository.update({ ...payload }, {
      where: { id }
    });
  }

  async updateLastLogin(user: User) {
    return user.update({ lastLogin: new Date() });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
  
  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

}
