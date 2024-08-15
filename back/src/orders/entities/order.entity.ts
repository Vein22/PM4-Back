import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderDetail } from '../../order-details/entities/order-detail.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;
  
  @ManyToOne(() => User, user => user.orders)
  user: User;

  @OneToOne(() => OrderDetail)
  @JoinColumn()
  orderDetail: OrderDetail;
}
