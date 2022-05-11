import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Mario!';
  }

  newEndpoint(): string {
    return 'Soy nuevo';
  }

  getProduct(productId: number): string {
    return `se busca el producto con ID ${productId}`;
  }

  getProducts(limit: number, offset: number, brand: string): string {
    return `Se listan todos los productos de la marca ${brand}, con LIMIT => ${limit} y OFFSET => ${offset}`;
  }

  showCategory(id: string, productId: string) {
    return `product ${productId} and ${id}`;
  }

  productFilter() {
    return 'Algo';
  }
}
