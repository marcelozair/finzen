import { User } from '../schemas/user.schema';

export const UserProviderRepository = {
  provide: 'USERS_REPOSITORY',
  useValue: User,
};
