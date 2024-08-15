import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDetail } from '../order-details/entities/order-detail.entity';
import { Order } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, products } = createOrderDto;

    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['orders'], select: ['id', 'name', 'email', 'phone', 'country', 'address', 'city'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const productEntities = [];
    let total = 0;
    for (const productDto of products) {
      const product = await this.productRepository.findOne({ where: { id: productDto.id } });
      if (!product) {
        throw new NotFoundException(`Product with ID ${productDto.id} not found`);
      }
      if (product.stock <= 0) {
        throw new BadRequestException(`Product with ID ${productDto.id} is out of stock`);
      }
      productEntities.push(product);
      total += product.price;
      product.stock -= 1;
      await this.productRepository.save(product);
    }

    const orderDetail = new OrderDetail();
    orderDetail.price = total;
    orderDetail.products = productEntities;
    await this.orderDetailRepository.save(orderDetail);

    const order = new Order();
    order.user = user;
    order.total = total;
    order.orderDetail = orderDetail;
    return this.orderRepository.save(order);
  }


  async getOrder(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['user', 'orderDetail', 'orderDetail.products'],
    });

    if (order && order.user) {
      delete order.user.password;
    }

    return order;
  }
}





