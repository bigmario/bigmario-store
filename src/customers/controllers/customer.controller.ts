import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

import { ParseIntPipe } from 'src/common/parse-int.pipe';

import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/customers/dto/customer.dto';
import { CustomersService } from '../services/customer.service';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.customersService.findOne(id);
  }

  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.getOrderByCustomer(id);
  }

  // @Post()
  // create(@Body() payload: CreateCustomerDto) {
  //   return this.customersService.create(payload);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() payload: UpdateCustomerDto) {
  //   return this.customersService.update(id, payload);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customersService.remove(id);
  // }
}
