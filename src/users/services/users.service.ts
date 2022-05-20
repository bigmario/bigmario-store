import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';

import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
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

  // create(data: CreateUserDto) {
  //   const newUser = new this.userModel(data);
  //   return newUser.save();
  // }

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
