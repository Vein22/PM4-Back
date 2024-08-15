import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateProductDto {

     /**
     * Campo para actualizar el nombre del producto.
     * @example Procesador.
     */
     @ApiProperty({
        example: 'Procesador.',
        description: 'Campo para actualizar el nombre del producto.'
      })
    @IsString()
    @IsOptional()
    name: string;


     /**
     * Campo para actualizar la descripción del producto.
     * @example Procesador Xeon E5 2680 v4. Procesador de servidores dedicado a tareas multinucleo.
     */
     @ApiProperty({
        example: 'Procesador Xeon E5 2680 v4. Procesador de servidores dedicado a tareas multinucleo.',
        description: 'Campo para actualizar la descripción del producto.'
      })
    @IsString()
    @IsOptional()
    description: string;


    /**
     * Campo para actualizar el precio del producto.
     * @example 29.99$.
     */
    @ApiProperty({
        example: '29.99',
        description: 'Campo para actualizar el precio del producto.'
      })
    @IsOptional()
    price: number;


     /**
     * Campo para actualizar el stock al que pertence el producto.
     * @example Stock numero 12.
     */
     @ApiProperty({
        example: 12,
        description: 'Campo para actualizar el stock al que pertence el producto.'
      })
    @IsOptional()
    stock: number;


    /**
     * Campo para actualizar la imagen demostrativa del producto.
     * @example imagen.jpg.
     */
    @ApiProperty({
        example: 'imagen.jpg.',
        description: 'Campo para actualizar la imagen demostrativa del producto.'
      })
    @IsString()
    @IsOptional()
    imgUrl: string;
}