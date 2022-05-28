import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';

import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/user.dto';
import { CustomersService } from 'src/customers/services/customer.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private customersService: CustomersService,
    private configService: ConfigService,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: string) {
    const user = this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    if (data.customerId) {
      const customer = await this.customersService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return newUser.save();
  }

  // update(id: string, changes: UpdateUserDto) {
  //   const user = this.userModel.findByIdAndUpdate(
  //     id,
  //     { $set: changes },
  //     { new: true },
  //   );
  //   if (!user) {
  //     throw new NotFoundException(`User #${id} not found`);
  //   }
  //   return user;
  // }

  // remove(id: string) {
  //   const user = this.userModel.findByIdAndDelete(id);
  //   if (!user) {
  //     throw new NotFoundException(`User #${id} not found`);
  //   }
  //   return user;
  // }
}
