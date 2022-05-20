import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
  AddProductsToOrderDto,
} from '../dto/order.dto';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  // @Post()
  // create(@Body() createOrderDto: CreateOrderDto) {
  //   return this.ordersService.create(createOrderDto);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id', MongoIdPipe) id: string,
  //   @Body() updateOrderDto: UpdateOrderDto,
  // ) {
  //   return this.ordersService.update(id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id', MongoIdPipe) id: string) {
  //   return this.ordersService.remove(id);
  // }

  // @Delete(':id/product/:productId')
  // removeProduct(
  //   @Param('id', MongoIdPipe) id: string,
  //   @Param('productId', MongoIdPipe) productId: string,
  // ) {
  //   return this.ordersService.removeProduct(id, productId);
  // }

  // @Put(':id/products')
  // updateProducts(
  //   @Param('id', MongoIdPipe) id: string,
  //   @Body() payload: AddProductsToOrderDto,
  // ) {
  //   return this.ordersService.addProducts(id, payload.productsIds);
  // }
}
