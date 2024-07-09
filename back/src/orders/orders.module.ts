import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"
import { OrderDetail } from "src/order-details/entities/order-detail.entity";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
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