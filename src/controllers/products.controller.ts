import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  //ParseIntPipe,
} from '@nestjs/common';

import { ProductsService } from '../services/products.service';
import { Product } from '../entities/product.entity';
import { ParseIntPipe } from '../common/parse-int.pipe';
import { CreateProductDto } from 'src/dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly pService: ProductsService) {}

  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'algo',
      image: 'algo',
      stock: 200,
      price: 2000,
    },
  ];

  @Get('filter')
  getProductFilter() {
    return this.pService.productFilter();
  }

  @Get()
  getAllProducts(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.pService.getAllProducts(limit, offset);
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOneProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.pService.getOneProduct(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.pService.createProduct(payload);
  }

  @Put(':productId')
  update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() payload: Product,
  ) {
    return this.pService.updateProduct(productId, payload);
  }

  @Delete(':productId')
  delete(@Param('productId', ParseIntPipe) productId: number) {
    return this.pService.deleteProduct(productId);
  }
}