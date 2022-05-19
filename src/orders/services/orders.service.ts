import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  findAll() {
    return this.orderModel
      .find()
      .populate('customer')
      .populate('products')
      .exec();
  }

  findOne(id: string) {
    const order = this.orderModel
      .findById(id)
      .populate('customer')
      .populate('products');
    if (!order) {
      throw new NotFoundException(`Order ID #${id} not found`);
    }
    return order;
  }

  create(data: CreateOrderDto) {
    const newOrder = new this.orderModel(data);
    return newOrder.save();
  }

  update(id: string, changes: UpdateOrderDto) {
    const order = this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!order) {
      throw new NotFoundException(`Order ID #${id} not found`);
    }
    return order;
  }

  remove(id: string) {
    const order = this.orderModel.findByIdAndDelete(id).exec();
    if (!order) {
      throw new NotFoundException(`Order ID #${id} not found`);
    }
    return order;
  }

  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id);
    order.products.pull(productId);
    return order.save();
  }

  async addProducts(id: string, productsIds: string[]) {
    const order = await this.orderModel.findById(id);
    productsIds.forEach((idProduct) => order.products.push(idProduct));
    return order.save();
  }
}
