import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/products/entities/product.entity';
import { ProductsModule } from 'src/products/products.module';
import { UsersController } from './controllers/users.controller';
import { User, UserSchema } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { ProfileController } from './controllers/profile.controller';
import { OrdersModule } from 'src/orders/orders.module';
import { OrdersService } from 'src/orders/services/orders.service';
import { Order, OrderSchema } from 'src/orders/entities/order.entity';

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [UsersController, ProfileController],
  providers: [UsersService, OrdersService],
  exports: [UsersService],
})
export class UsersModule {}
