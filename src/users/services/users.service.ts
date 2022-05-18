import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';

import { CreateUserDto, UpdateUserDto } from 'src/users/dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/products/entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    private configService: ConfigService,
  ) {}

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    const user = this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  update(id: string, changes: UpdateUserDto) {
    const user = this.userModel.findByIdAndUpdate(
      id,
      { $set: changes },
      { new: true },
    );
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  remove(id: string) {
    const user = this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
}
