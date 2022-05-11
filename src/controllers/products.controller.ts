import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly appService: AppService) {}

  @Get('filter')
  getProductFilter() {
    return this.appService.productFilter();
  }

  @Get('get-products')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.appService.getProducts(limit, offset, brand);
  }

  @Get(':productId')
  getProduct(@Param('productId') productId: number) {
    return this.appService.getProduct(productId);
  }
}
