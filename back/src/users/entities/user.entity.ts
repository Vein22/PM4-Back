import { Order } from '../../orders/entities/order.entity';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany,  ManyToOne } from 'typeorm';
import {v4 as uuid} from "uuid";
import { ApiProperty } from '@nestjs/swagger';


@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

   /**
   * El nombre del usuario.
   * @example John Doe
   */
   @ApiProperty({
    example: 'John Doe',
    description: 'El nombre del usuario.'
  })
  @Column({length: 50, nullable: false})
  name: string;
  
   /**
   * El correo electrónico del usuario.
   * @example user@example.com
   */
   @ApiProperty({
    example: 'user@example.com',
    description: 'El correo electrónico del usuario.'
  })
  @Column({length: 50, nullable: false, unique: true })
  email: string;

   /**
     * La contraseña debe ser dificil de descifrar.
     * @example Strong!(Password)
     */
   @ApiProperty({
    example: 'Strong!(Password)',
    description: 'La contraseña debe ser difícil de descifrar.'
  })
  @Column({length: 100, nullable: false})
  password: string;

   /**
     * Número de telefono personal.
     * @example +58 214 378 6342.
     */
   @ApiProperty({
    example: '+58 214 378 6342.',
    description: 'Número de telefono personal.'
  })
  @Column({nullable: false })
  phone: number;
  
  /**
     * Pais residente.
     * @example Argentina.
     */
  @ApiProperty({
    example: 'Argentina.',
    description: 'Pais residente.'
  })
  @Column({length: 50})
  country: string;

   /**
     * Dirección de domicilio.
     * @example SnowValley sector 8 calle 3 casa 21.
     */
   @ApiProperty({
    example: 'SnowValley sector 8 calle 3 casa 21.',
    description: 'Dirección de domicilio.'
  })
  @Column({length: 100})
  address: string;

  
      /**
     * Ciudad residente.
     * @example Buenos Aires.
     */
      @ApiProperty({
        example: 'Buenos Aires.',
        description: 'Ciudad residente.'
      })
  @Column({length: 50})
  city: string;

  @Column({default: false})
  isAdmin: boolean;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}