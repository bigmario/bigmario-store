import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductsModule } from 'src/products/products.module';
import { CustomersController } from './controllers/customer.controller';
import { Customer } from './entities/customer.entity';
import { CustomersService } from './services/customer.service';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([Customer, Product])],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
