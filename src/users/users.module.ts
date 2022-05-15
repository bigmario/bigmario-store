import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { CustomersController } from './controllers/customer.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersService } from './services/customer.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
