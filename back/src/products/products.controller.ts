import { Controller, Get, Post, Delete, Put, Param, UseGuards, Body, HttpCode, NotFoundException, Query  } from "@nestjs/common";
import { AuthGuard } from "src/auth/guard/Auth.Guard";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";
import { validate } from 'class-validator';
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller("products")
export class ProductsController{
    constructor (private readonly productsServices: ProductsService) {}
    
      @HttpCode(201)
      @Post("seeder")
      @UseGuards(AuthGuard) 
      async createProduct(@Body() createProductDto: CreateProductDto) {
          return this.productsServices.createProduct(createProductDto)
      }

    @HttpCode(200)
    @Get()
    async getProducts(@Query('page') page: number=1, @Query('limit') limit: number=5){
        return await this.productsServices.getProducts(page, limit);
    }

    @HttpCode(200)
    @Get(':id')
    async getProductsById(@Param('id') id: string) {
      return await this.productsServices.getProductsById(id);
    }
  

    @Put(":id")
    @UseGuards(AuthGuard)
    async updateProductById(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
      return this.productsServices.updateProductById(id, updateProductDto)
    }

  
    @Delete(':id')
    @UseGuards(AuthGuard) 
    async deleteProductById(@Param('id') id: string) {
        return await this.productsServices.deleteProductById(id);
    }
  }
