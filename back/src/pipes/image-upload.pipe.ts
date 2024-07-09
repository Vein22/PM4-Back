import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';


@Injectable()
export class ImageUploadPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    const maxSize = 200000;
      
    if(file.size > maxSize ) {
      throw new BadRequestException('File size too large')
    }
    return file;
  }
}

