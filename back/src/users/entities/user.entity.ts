import { Order } from 'src/orders/entities/order.entity';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany,  ManyToOne } from 'typeorm';
import {v4 as uuid} from "uuid";


@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 50, nullable: false})
  name: string;
  
  @Column({length: 50, nullable: false, unique: true })
  email: string;

  @Column({length: 100, nullable: false})
  password: string;

  @Column({nullable: false })
  phone: number;
  
  @Column({length: 50})
  country: string;

  @Column({length: 100})
  address: string;

  @Column({length: 50})
  city: string;

  @Column({default: false})
  isAdmin: boolean;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}