
import { IsEmail, IsNotEmpty, IsString, MaxLength, IsOptional, MinLength, Matches, IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {

   /**
   * El nombre del usuario.
   * @example John Doe
   */
   @ApiProperty({
    example: 'John Doe',
    description: 'El nombre del usuario.'
  })
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    name: string;


      /**
   * El correo electrónico del usuario.
   * @example user@example.com
   */
  @ApiProperty({
    example: 'user@example.com',
    description: 'El correo electrónico del usuario.'
  })
    @IsEmail()
    @IsNotEmpty()
    email: string;


    /**
     * La contraseña debe ser dificil de descifrar.
     * @example Strong!Password1
     */
    @ApiProperty({
      example: 'Strong!Password1',
      description: 'La contraseña debe ser difícil de descifrar.'
    })
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/, {
      message: 'Password too weak. The password needs to contain capital letters, a number and a symbol.',
    })
    password: string;


    /**
     * La contraseña debe ser la misma.
     * @example Strong!Password1
     */
    @ApiProperty({
      example: 'Strong!Password1',
      description: 'La contraseña debe ser la misma.'
    })
    @IsNotEmpty()
    @IsString()
    confirmPassword: string;


     /**
     * Dirección de domicilio.
     * @example SnowValley sector 8 calle 3 casa 21.
     */
     @ApiProperty({
      example: 'SnowValley sector 8 calle 3 casa 21.',
      description: 'Dirección de domicilio.'
    })
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    /**
     * Número de telefono personal.
     * @example 582143783
     */
    @ApiProperty({
      example: 582143783,
      description: 'Número de telefono personal.'
    })
    @IsNotEmpty()
    phone: number;


    /**
     * Pais residente.
     * @example Argentina.
     */
    @ApiProperty({
      example: 'Argentina.',
      description: 'Pais residente.'
    })
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    country: string;
  
      /**
     * Ciudad residente.
     * @example Buenos Aires.
     */
      @ApiProperty({
        example: 'Buenos Aires.',
        description: 'Ciudad residente.'
      })
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    city: string;

    @IsEmpty()
    isAdmin: boolean;
}