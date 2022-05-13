import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Mario!';
  }

  newEndpoint(): any {
    return {
      message: 'Soy nuevo',
    };
  }

  getProduct(productId: number) {
    return {
      message: `producto con ID ${productId} encontrado`,
    };
  }

  getProducts(limit: number, offset: number, brand: string) {
    return {
      marca: brand,
      limit: limit,
      offset: offset,
    };
  }

  showCategory(id: string, productId: string) {
    return {
      message: `product ${productId} and ${id}`,
    };
  }

  productFilter() {
    return {
      message: 'Algo',
    };
  }
}
