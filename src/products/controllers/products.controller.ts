import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';

import { MongoIdPipe } from 'src/common/mongo-id.pipe';

import { ProductsService } from 'src/products/services/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from 'src/products/dto/products.dto';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly pService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of Products' })
  getAllProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.pService.getAllProducts();
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOneProduct(@Param('productId') productId: number) {
    return this.pService.getOneProduct(productId);
  }

  // @Post()
  // create(@Body() payload: CreateProductDto) {
  //   return this.pService.createProduct(payload);
  // }

  // @Put(':productId')
  // update(
  //   @Param('productId', MongoIdPipe) productId: string,
  //   @Body() payload: UpdateProductDto,
  // ) {
  //   return this.pService.updateProduct(productId, payload);
  // }

  // @Delete(':productId')
  // delete(@Param('productId', MongoIdPipe) productId: string) {
  //   return this.pService.deleteProduct(productId);
  // }
}
