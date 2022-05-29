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
  UseGuards,
} from '@nestjs/common';

import { MongoIdPipe } from 'src/common/mongo-id.pipe';

import { ProductsService } from 'src/products/services/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from 'src/products/dto/products.dto';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Products')
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly pService: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List of Products' })
  getAllProducts(@Query() params: FilterProductsDto) {
    return this.pService.getAllProducts(params);
  }

  @Public()
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOneProduct(@Param('productId', MongoIdPipe) productId: string) {
    return this.pService.getOneProduct(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.pService.createProduct(payload);
  }

  @Put(':productId')
  update(
    @Param('productId', MongoIdPipe) productId: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.pService.updateProduct(productId, payload);
  }

  @Delete(':productId')
  delete(@Param('productId', MongoIdPipe) productId: string) {
    return this.pService.deleteProduct(productId);
  }
}
