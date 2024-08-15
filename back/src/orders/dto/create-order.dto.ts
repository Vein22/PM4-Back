import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, ArrayMinSize, ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';

class ProductIdDto {
@IsUUID()
id: string;
quantity: number; 
}

export class CreateOrderDto {

  /**
     * ID perteneciente al usuario.
     * @example 8af19289-f893-4617-9809-eae6769d4415.
     */
  @ApiProperty({
    example: '8af19289-f893-4617-9809-eae6769d4415.',
    description: 'ID perteneciente al usuario.'
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;


  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductIdDto)
  products: ProductIdDto[];
}
