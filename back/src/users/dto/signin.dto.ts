import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class SignInDto {

    /**
   * El correo electrónico del usuario.
   * @example user@example.com
   */
    @ApiProperty({
      example: 'user@example.com',
      description: 'El correo electrónico del usuario.'
    })
  @IsNotEmpty()
  @IsEmail()
  email: string;


   /**
     * La contraseña ya creada del usuario.
     * @example Strong!Password1
     */
   @ApiProperty({
    example: 'Strong!Password1',
    description: 'La contraseña ya creada del usuario.'
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}