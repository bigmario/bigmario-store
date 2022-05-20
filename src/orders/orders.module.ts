import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { ProductsModule } from 'src/products/products.module';
import { Product } from 'src/products/entities/product.entity';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([Order, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
