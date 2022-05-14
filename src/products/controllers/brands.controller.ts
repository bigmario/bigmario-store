import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Post,
} from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dto/brand.dto';

import { BrandsService } from 'src/products/services/brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  getAllBrands() {
    return this.brandsService.getAllBrands();
  }

  @Get(':id')
  getOneBrand(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.getOneBrand(id);
  }

  @Post()
  createBrand(@Body() payload: CreateBrandDto) {
    return this.brandsService.createBrand(payload);
  }

  @Put(':id')
  updateBrand(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.updateBrand(id, payload);
  }

  @Delete(':id')
  removeBrand(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.removeBrand(id);
  }
}
