import { Injectable, Inject } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import 'multer';

@Injectable()
export class FilesRepository {
  constructor(@Inject('cloudinary') private cloudinary) {}

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }).end(file.buffer);
    });
  }
}