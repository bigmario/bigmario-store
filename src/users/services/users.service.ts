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
    return this.userModel.find({}, { password: 0 });
  }

  async findOne(id: string) {
    const user = this.userModel.findById(id, { password: 0 }).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async create(data: CreateUserDto) {
    const newUser = new this.userModel(data);
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    const user = await newUser.save();
    const { password, ...rta } = user.toJSON();
    return rta;
  }

  async update(id: string, changes: UpdateUserDto) {
    const user = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: changes },
      { new: true },
    );
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    const { password, ...rta } = user.toJSON();
    return rta;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    const { password, ...rta } = user.toJSON();
    return rta;
  }
}
