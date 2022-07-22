import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private orderRepo: Repository<Order>) {}

  findAll() {
    return this.orderRepo.find();
  }

  findOne(id: number) {
    const order = this.orderRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!order) {
      throw new NotFoundException(`Order ID #${id} not found`);
    }
    return order;
  }

  // create(data: CreateOrderDto) {
  //   const newOrder = new this.orderModel(data);
  //   return newOrder.save();
  // }

  // update(id: string, changes: UpdateOrderDto) {
  //   const order = this.orderModel
  //     .findByIdAndUpdate(id, { $set: changes }, { new: true })
  //     .exec();
  //   if (!order) {
  //     throw new NotFoundException(`Order ID #${id} not found`);
  //   }
  //   return order;
  // }

  // remove(id: string) {
  //   const order = this.orderModel.findByIdAndDelete(id).exec();
  //   if (!order) {
  //     throw new NotFoundException(`Order ID #${id} not found`);
  //   }
  //   return order;
  // }

  // async removeProduct(id: string, productId: string) {
  //   const order = await this.orderModel.findById(id);
  //   order.products.pull(productId);
  //   return order.save();
  // }

  // async addProducts(id: string, productsIds: string[]) {
  //   const order = await this.orderModel.findById(id);
  //   productsIds.forEach((idProduct) => order.products.push(idProduct));
  //   return order.save();
  // }
}
