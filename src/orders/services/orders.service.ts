import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  create(data: CreateOrderDto) {
    const newOrder = new this.orderModel(data);
    return newOrder.save();
  }

  findAll() {
    return this.orderModel.find();
  }

  findOne(id: number) {
    const order = this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException(`Order ID #${id} not found`);
    }
    return order;
  }

  update(id: number, changes: UpdateOrderDto) {
    const order = this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!order) {
      throw new NotFoundException(`Order ID #${id} not found`);
    }
    return order;
  }

  remove(id: number) {
    const order = this.orderModel.findByIdAndDelete(id).exec();
    if (!order) {
      throw new NotFoundException(`Order ID #${id} not found`);
    }
    return order;
  }
}
