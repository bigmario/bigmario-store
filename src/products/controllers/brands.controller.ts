import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { BrandsService } from 'src/products/services/brands.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Brands')
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

  // @Post()
  // createBrand(@Body() payload: CreateBrandDto) {
  //   return this.brandsService.createBrand(payload);
  // }

  // @Put(':id')
  // updateBrand(
  //   @Param('id', MongoIdPipe) id: string,
  //   @Body() payload: UpdateBrandDto,
  // ) {
  //   return this.brandsService.updateBrand(id, payload);
  // }

  // @Delete(':id')
  // removeBrand(@Param('id', MongoIdPipe) id: string) {
  //   return this.brandsService.removeBrand(id);
  // }
}
