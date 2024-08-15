import { ApiProperty } from '@nestjs/swagger';


export class CreateProductDto {

    /**
     * Nombre del producto.
     * @example Procesador.
     */
    @ApiProperty({
      example: 'Procesador.',
      description: 'Nombre del producto.'
    })
    name: string;


    /**
     * Descripción del producto.
     * @example Procesador Xeon E5 2680 v4. Procesador de servidores dedicado a tareas multinucleo.
     */
    @ApiProperty({
      example: 'Procesador Xeon E5 2680 v4. Procesador de servidores dedicado a tareas multinucleo.',
      description: 'Descripción del producto.'
    })
    description: string;


    /**
     * Precio del producto.
     * @example 29.99$.
     */
    @ApiProperty({
      example: '29.99',
      description: 'Precio del producto.'
    })
    price: number;


     /**
     * El stock al que pertence el producto.
     * @example Stock numero 12.
     */
     @ApiProperty({
      example: 12,
      description: 'El stock al que pertence el producto.'
    })
    stock: number;

     /**
     * Imagen demostrativa del producto.
     * @example imagen.jpg.
     */
     @ApiProperty({
      example: 'imagen.jpg.',
      description: 'Imagen demostrativa del producto.'
    })
    imgUrl: string;
  }