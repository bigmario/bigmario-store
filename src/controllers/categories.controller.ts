import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly appService: AppService) {}

  @Get(':id/products/:productId')
  getCategory(@Param('productId') productId: string, @Param('id') id: string) {
    return this.appService.showCategory(id, productId);
  }
}
