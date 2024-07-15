import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/auth/guard/Auth.Guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

 
  @Post()
  @UseGuards(AuthGuard)
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.addOrder(createOrderDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getOrder(@Param('id') id: string): Promise<Order> {
    return this.ordersService.getOrder(id);
  }
}