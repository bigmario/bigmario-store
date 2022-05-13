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
  ParseIntPipe,
} from '@nestjs/common';

import { ProductsService } from '../services/products.service';
import { Product } from '../entities/product.entity';

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
  create(@Body() payload: Product) {
    // return {
    //   message: 'Accion de crear',
    //   payload,
    // };
    return this.pService.createProduct(payload);
  }

  @Put(':productId')
  update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() payload: Product,
  ) {
    // return {
    //   message: `Producto N° ${productId} actualizado`,
    //   payload: payload,
    // };
    return this.pService.updateProduct(productId, payload);
  }

  @Delete(':productId')
  delete(@Param('productId', ParseIntPipe) productId: number) {
    return this.pService.deleteProduct(productId);
  }
}
