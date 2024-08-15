import { Controller, Post, Body, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { CategoriesService } from './category.service';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiTags('Categories')
  @HttpCode(200)
  @Get()
  async getCategories(){
      return await this.categoriesService.getCategories();
  }

  @ApiTags('Categories')
  @Post('seeder')
  async addCategories(@Body() categories: Category[]): Promise<void> {
    return this.categoriesService.addCategories(categories);
  }
}
