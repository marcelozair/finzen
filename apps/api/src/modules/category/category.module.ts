import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryProviderRepository } from 'src/database/providers/category.provider';

@Module({
  imports: [UserModule],
  controllers: [CategoryController],
  providers: [CategoryProviderRepository, CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
