import { Controller, Get, Post, Delete, Put, Param, UseGuards, Body, HttpCode, NotFoundException, Query  } from "@nestjs/common";
import { AuthGuard } from "../auth/guard/auth.guard";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";
import { validate } from 'class-validator';
import { UpdateProductDto } from "./dto/update-product.dto";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../auth/roles/roles.enum";
import { RolesGuard } from "../auth/guard/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger/dist";

@Controller("products")
export class ProductsController{
    constructor (private readonly productsServices: ProductsService) {}
    
      @ApiTags('Products')
      @HttpCode(201)
      @Post("seeder")
      @UseGuards(AuthGuard) 
      @ApiBearerAuth()
      async createProduct(@Body() createProductDto: CreateProductDto) {
          return this.productsServices.createProduct(createProductDto)
      }

    @ApiTags('Products')
    @HttpCode(200)
    @Get()
    async getProducts(@Query('page') page: number=1, @Query('limit') limit: number=5){
        return await this.productsServices.getProducts(page, limit);
    }

    @ApiTags('Products')
    @HttpCode(200)
    @Get(':id')
    async getProductsById(@Param('id') id: string) {
      return await this.productsServices.getProductsById(id);
    }
  
    @ApiTags('Products')
    @Put(":id")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    async updateProductById(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
      return this.productsServices.updateProductById(id, updateProductDto)
    }

    @ApiTags('Products')
    @Delete(':id')
    @UseGuards(AuthGuard) 
    @ApiBearerAuth()
    async deleteProductById(@Param('id') id: string) {
        return await this.productsServices.deleteProductById(id);
    }
  }
