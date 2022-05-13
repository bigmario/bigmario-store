import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  showCategory(id: string, productId: string) {
    return {
      message: `product ${productId} and ${id}`,
    };
  }
}
