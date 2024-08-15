import { Injectable } from "@nestjs/common";
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { FilesRepository } from "./files.repository";

@Injectable()
export class FilesService{
    constructor (private readonly filesRepository: FilesRepository) {}

    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return await this.filesRepository.uploadImage(file);
    }
}