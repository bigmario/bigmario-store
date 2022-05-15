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
  //ParseIntPipe,
} from '@nestjs/common';

import { ProductsService } from 'src/products/services/products.service';
import { Product } from 'src/products/entities/product.entity';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dto/products.dto';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
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
  getAllProducts() {
    return this.pService.getAllProducts();
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
    @Body() payload: UpdateProductDto,
  ) {
    return this.pService.updateProduct(productId, payload);
  }

  @Delete(':productId')
  delete(@Param('productId', ParseIntPipe) productId: number) {
    return this.pService.deleteProduct(productId);
  }
}
