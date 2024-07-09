import { Controller, Post, Body, Get, HttpCode } from '@nestjs/common';
import { CategoriesService } from './category.service';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @HttpCode(200)
  @Get()
  async getCategories(){
      return await this.categoriesService.getCategories();
  }

  @Post('seeder')
  async addCategories(@Body() categories: Category[]): Promise<void> {
    return this.categoriesService.addCategories(categories);
  }
}
