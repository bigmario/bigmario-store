import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';

import { CreateUserDto, UpdateUserDto } from 'src/users/dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/products/entities/product.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

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

  async findByEmail(email: string) {
    const user = await this.userModel
      .findOne({
        email: email,
      })
      .exec();

    if (!user) {
      throw new NotFoundException(`User #${email} not found`);
    }

    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = new this.userModel(data);
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    const user = await newUser.save();
    const { password, ...rta } = user.toJSON();
    return rta;
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
