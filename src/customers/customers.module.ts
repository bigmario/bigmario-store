import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { CustomersController } from './controllers/customer.controller';
import { CustomersService } from './services/customer.service';

@Module({
  imports: [ProductsModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
