import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";



@Injectable()
export class ProductsRepository{
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
      ) {}
    

    async getProducts(page: number, limit: number): Promise<Product[]> {
        return await this.productRepository.find({
            take: limit,
            skip: (page - 1) * limit,
          });
    }

    async getProductsById(id: string): Promise<Product>{
        return await this.productRepository.findOneBy({id});    
        }

        async createProduct(createProductDto: CreateProductDto): Promise<Product> {
            const newProduct = this.productRepository.create(createProductDto);
            return await this.productRepository.save(newProduct);
        }

             
     async updateProductById(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    return this.getProductsById(id);
  }

  async deleteProductById(id: string): Promise<{id:string}> {
    await this.productRepository.delete(id);
    return { id };
  }
}