import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ProductsModule } from '../products/products.module'; 
import { CloudinaryConfig } from '../config/cloudinary';
import { ConfigModule } from '@nestjs/config';
import { FilesRepository } from './files.repository';


@Module({
  imports: [ProductsModule, ConfigModule],
  providers: [FilesService, FilesRepository, CloudinaryConfig],
  controllers: [FilesController],
})
export class FilesModule {}
