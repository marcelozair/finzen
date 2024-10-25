import { Category } from '../schemas/category.schema';

export const CategoryProviderRepository = {
  provide: 'CATEGORY_REPOSITORY',
  useValue: Category,
};
