import { Controller, Post, Param, UploadedFile, UseInterceptors, BadRequestException, UsePipes, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { ProductsService } from '../products/products.service';
import { ImageUploadPipe } from '../pipes/image-upload.pipe';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist/decorators';



@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly productsService: ProductsService,
  ) {}

  @ApiTags('Files')
  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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


