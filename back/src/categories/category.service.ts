import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.getCategories();
  }

  async addCategories(categories: Category[]): Promise<void> {
    return this.categoryRepository.addCategories(categories);
  }
}
