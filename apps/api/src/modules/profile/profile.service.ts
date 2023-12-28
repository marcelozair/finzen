import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../database/schemas/user.schema';
import { Profile } from '../../database/schemas/profile.schema';

@Injectable()
export class ProfileService {
  @Inject('PROFILES_REPOSITORY')
  private accountRepository: typeof Profile;

  async createProfile(name: string, user: User) {
    const profile = await this.accountRepository.create({
      name,
      userId: user.id,
    });

    return profile;
  }

  async getProfile(profileId: number) {
    const profile = await this.accountRepository.findOne({
      where: {
        id: profileId,
      },
    });

    return profile;
  }
}
