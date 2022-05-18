import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/products/entities/product.entity';
import { ProductsModule } from 'src/products/products.module';
import { CustomersController } from './controllers/customer.controller';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { CustomersService } from './services/customer.service';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
