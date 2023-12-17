import { Profile } from '../schemas/profile.schema';

export const ProfileProviderRepository = {
  provide: 'PROFILES_REPOSITORY',
  useValue: Profile,
};
