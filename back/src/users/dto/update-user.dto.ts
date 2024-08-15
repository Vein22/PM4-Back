import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateUserDto {

       /**
   * Campo para actualizar el correo electrónico del usuario.
   * @example user@example.com
   */
  @ApiProperty({
    example: 'user@example.com',
    description: 'Campo para actualizar el correo electrónico del usuario.'
  })
    @IsEmail()
    @IsOptional()
    email?: string;


      /**
   * Campo para actualizar el nombre del usuario.
   * @example John Doe
   */
   @ApiProperty({
    example: 'John Doe',
    description: 'Campo para actualizar el nombre del usuario.'
  })
    @IsString()
    @IsOptional()
    name?: string;


    /**
     * Campo para actualizar la contraseña que debe ser dificil de descifrar.
     * @example Strong!(Password)
     */
    @ApiProperty({
        example: 'Strong!(Password)',
        description: 'Campo para actualizar la contraseña que debe ser dificil de descifrar.'
      })
    @IsString()
    @IsOptional()
    @MaxLength(20)
    password?: string;


     /**
     * Campo para actualizar la dirección de domicilio.
     * @example SnowValley sector 8 calle 3 casa 21.
     */
     @ApiProperty({
        example: 'SnowValley sector 8 calle 3 casa 21.',
        description: 'Campo para actualizar la dirección de domicilio.'
      })
    @IsString()
    @IsOptional()
    address?: string;


     /**
     * Campo para actualizar el número de telefono personal.
     * @example 582143783
     */
     @ApiProperty({
        example: '582143783',
        description: 'Campo para actualizar el número de telefono personal.'
      })
    @IsOptional()
    phone?: number;


     /**
     * Campo para actualizar el pais residente.
     * @example Argentina.
     */
     @ApiProperty({
        example: 'Argentina.',
        description: 'Campo para actualizar el pais residente.'
      })
    @IsString()
    @IsOptional()
    country?: string;


      /**
     * Campo para actualizar la ciudad residente.
     * @example Buenos Aires.
     */
      @ApiProperty({
        example: 'Buenos Aires.',
        description: 'Campo para actualizar la ciudad residente.'
      })
    @IsString()
    @IsOptional()
    city?: string;
}