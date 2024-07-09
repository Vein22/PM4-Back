import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";
import { ProductsRepository } from "./products.repository";

@Injectable()
export class ProductsService{
    constructor (private readonly productsRepository: ProductsRepository) {}
    
        async createProduct(createProductDto: CreateProductDto): Promise<Product> {
            return await this.productsRepository.createProduct(createProductDto);
        }

    async getProducts(page: number, limit: number): Promise<Product[]> {
        return await this.productsRepository.getProducts(page, limit);
    }

    async getProductsById(id: string): Promise<Product> {
        return await this.productsRepository.getProductsById(id);
    }

    async updateProductById(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        return this.productsRepository.updateProductById(id, updateProductDto);
      }

    async deleteProductById(id: string): Promise<{id:string}>  {
        return this.productsRepository.deleteProductById(id);
    }

    async updateProductImage(id: string, imageUrl: string): Promise<Product> {
        const product = await this.productsRepository.getProductsById( id );
        if (!product) {
          throw new NotFoundException(`Product with ID ${id} not found`);
        }
    
        product.imgUrl = imageUrl;
        return this.productsRepository.createProduct(product);
      }
}