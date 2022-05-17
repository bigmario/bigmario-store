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
} from '@nestjs/common';

import { ProductsService } from 'src/products/services/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dto/products.dto';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly pService: ProductsService) {}

  @Get()
  getAllProducts() {
    return this.pService.getAllProducts();
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOneProduct(@Param('productId') productId: string) {
    return this.pService.getOneProduct(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.pService.createProduct(payload);
  }

  @Put(':productId')
  update(
    @Param('productId') productId: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.pService.updateProduct(productId, payload);
  }

  @Delete(':productId')
  delete(@Param('productId') productId: string) {
    return this.pService.deleteProduct(productId);
  }
}
