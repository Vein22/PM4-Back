
import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    @MaxLength(20)
    description: string;

    @IsOptional()
    price: number;

    @IsOptional()
    stock: number;

    @IsString()
    @IsOptional()
    imgUrl: string;
}