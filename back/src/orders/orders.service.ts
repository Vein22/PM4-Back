import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./entities/order.entity";
import { OrdersRepository } from "./orders.repository";

@Injectable()
export class OrdersService{
    constructor (private readonly ordersRepository: OrdersRepository) {}

    async addOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        return await this.ordersRepository.addOrder(createOrderDto);
    }

    async getOrder(orderId: string): Promise<Order> {
        return await this.ordersRepository.getOrder(orderId);
    }
}