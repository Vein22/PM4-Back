
import { IsNotEmpty, IsUUID, ArrayMinSize, ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';

class ProductIdDto {
@IsUUID()
id: string;
quantity: number; 
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;


  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductIdDto)
  products: ProductIdDto[];
}
