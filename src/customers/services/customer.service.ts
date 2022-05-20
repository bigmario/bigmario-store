import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from 'src/customers/entities/customer.entity';
import { ProductsService } from 'src/products/services/products.service';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  findAll() {
    return this.customerRepo.find();
  }

  findOne(id: number) {
    const customer = this.customerRepo.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  // create(data: CreateCustomerDto) {
  //   const newCustomer = new this.customerModel(data);
  //   return newCustomer.save();
  // }

  // update(id: string, changes: UpdateCustomerDto) {
  //   const customer = this.customerModel
  //     .findByIdAndUpdate(id, { $set: changes }, { new: true })
  //     .exec();
  //   if (!customer) {
  //     throw new NotFoundException(`Customer #${id} not found`);
  //   }
  //   return customer;
  // }

  // remove(id: string) {
  //   const customer = this.customerModel.findByIdAndDelete(id);
  //   if (!customer) {
  //     throw new NotFoundException(`Customer #${id} not found`);
  //   }
  //   return customer;
  // }

  async getOrderByCustomer(id: number) {
    const customer = this.findOne(id);
    return {
      date: new Date(),
      customer: customer,
      products: await this.productsService.getAllProducts(),
    };
  }
}
