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
  Res,
} from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly appService: AppService) {}

  @Get('filter')
  getProductFilter() {
    return this.appService.productFilter();
  }

  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand = 'generic',
  ) {
    return this.appService.getProducts(limit, offset, brand);
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId') productId: number) {
    return this.appService.getProduct(productId);
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Accion de crear',
      payload,
    };
  }

  @Put(':productId')
  update(@Param('productId') productId: number, @Body() payload: any) {
    return {
      message: `Producto N° ${productId} actualizado`,
      payload: payload,
    };
  }

  @Delete(':productId')
  delete(@Param('productId') productId: number) {
    return {
      message: `Producto N° ${productId} eliminado`,
    };
  }
}
