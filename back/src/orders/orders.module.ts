import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"
import { OrderDetail } from "../order-details/entities/order-detail.entity";
import { Product } from "../products/entities/product.entity";
import { User } from "../users/entities/user.entity";
import { Order } from "./entities/order.entity";
import { OrdersController } from "./orders.controller";
import { OrdersRepository } from "./orders.repository";
import { OrdersService } from "./orders.service";

@Module({
    imports:[TypeOrmModule.forFeature([User, Order, Product, OrderDetail])],
    providers:[OrdersService, OrdersRepository],
    controllers:[OrdersController],
    exports:[OrdersService, OrdersRepository]
})
export class OrdersModule{}