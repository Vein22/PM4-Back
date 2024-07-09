import { Controller, Post, Param, UploadedFile, UseInterceptors, BadRequestException, UsePipes, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { ProductsService } from '../products/products.service';
import { ImageUploadPipe } from 'src/pipes/image-upload.pipe';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly productsService: ProductsService,
  ) {}

  @Post('uploadImage/:id')
  @UsePipes(ImageUploadPipe)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Param('id') id: string, @UploadedFile(
    new ParseFilePipe({
        validators:[
          new FileTypeValidator({fileType: /(jpg|jpeg|png|webp)$/,}),
            ],
          }),
  ) 
  file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const result = await this.filesService.uploadImage(file);
    await this.productsService.updateProductImage(id, result.secure_url);

    return { url: result.secure_url };
  }
}


