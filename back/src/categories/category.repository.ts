import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async addCategories(categories: Category[]): Promise<void> {
    for (const category of categories) {
      const existingCategory = await this.categoryRepository.findOne({ where: { name: category.name } });
      if (!existingCategory) {
        await this.categoryRepository.save(category);
      }
    }
  }
}