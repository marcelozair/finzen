import { Inject, Injectable } from "@nestjs/common";

import { seedCategories } from "./seed";
import { Category } from "src/database/schemas/category.schema";

@Injectable()
export class CategoryService {
  @Inject('CATEGORY_REPOSITORY')
  private categoryRepository: typeof Category;

  async bulkCreate(): Promise<void> {
    this.categoryRepository.bulkCreate(seedCategories);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

}