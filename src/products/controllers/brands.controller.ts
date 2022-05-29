import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dto/brand.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { BrandsService } from 'src/products/services/brands.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Brands')
@UseGuards(JwtAuthGuard)
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Public()
  @Get()
  getAllBrands() {
    return this.brandsService.getAllBrands();
  }

  @Public()
  @Get(':id')
  getOneBrand(@Param('id', MongoIdPipe) id: string) {
    return this.brandsService.getOneBrand(id);
  }

  @Post()
  createBrand(@Body() payload: CreateBrandDto) {
    return this.brandsService.createBrand(payload);
  }

  @Put(':id')
  updateBrand(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.updateBrand(id, payload);
  }

  @Delete(':id')
  removeBrand(@Param('id', MongoIdPipe) id: string) {
    return this.brandsService.removeBrand(id);
  }
}
