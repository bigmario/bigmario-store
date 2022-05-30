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
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/roles.model';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Brands')
@UseGuards(JwtAuthGuard, RolesGuard)
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

  @Roles(Role.ADMIN)
  @Post()
  createBrand(@Body() payload: CreateBrandDto) {
    return this.brandsService.createBrand(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  updateBrand(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.updateBrand(id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  removeBrand(@Param('id', MongoIdPipe) id: string) {
    return this.brandsService.removeBrand(id);
  }
}
