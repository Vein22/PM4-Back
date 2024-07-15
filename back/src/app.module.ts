import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { postgresDataSourceConfig } from './config/data-source';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/category.module';
import { OrdersModule } from './orders/orders.module';
import { FilesModule } from './files/files.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [postgresDataSourceConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => configService.get("data-source")
    }),
    UsersModule, ProductsModule, AuthModule, CategoriesModule, OrdersModule, FilesModule, JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
