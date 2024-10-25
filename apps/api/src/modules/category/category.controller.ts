import { Response } from 'express';
import { Controller, Res, HttpCode } from '@nestjs/common';
import { Get, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  @Inject(CategoryService)
  private categoryService: CategoryService;

  @Post('seed')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async runSeed(@Res() res: Response) {
    await this.categoryService.bulkCreate();

    return res.json({
      message: 'Categories created successful',
      data: null,
      success: true,
    });
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAll(@Res() res: Response) {
    const response = await this.categoryService.findAll();

    return res.json({
      message: 'successful',
      data: response,
      success: true,
    });
  }
}
