import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({name: "order_details"})
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false})
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @OneToOne(() => Order, order => order.orderDetail)
  order: Order;

  @ManyToMany(() => Product, product => product.orderDetails)
  products: Product[];
}
