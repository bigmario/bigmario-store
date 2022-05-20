import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductsModule } from 'src/products/products.module';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Product])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
