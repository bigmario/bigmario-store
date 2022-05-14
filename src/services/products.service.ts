import { NotFoundException, Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from 'src/dtos/products.dto';
@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: this.counterId,
      name: 'Product 1',
      description: 'bla bla',
      price: 122,
      image: '',
      stock: 12,
    },
  ];

  getAllProducts(limit: number, offset: number) {
    return {
      payload: this.products,
      limit: limit,
      offset: offset,
    };
  }

  getOneProduct(productId: number) {
    const product = this.products.find((item) => item.id === productId);

    if (!product) {
      throw new NotFoundException(`Product with ID# ${productId} not found`);
    }

    return product;
  }

  createProduct(payload: CreateProductDto) {
    this.counterId += 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id: number, payload: Product) {
    const product = this.getOneProduct(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = { ...product, ...payload };
      return this.products[index];
    }
    return null;
  }

  deleteProduct(id: number) {
    const productForDelete = this.getOneProduct(id);
    if (productForDelete) {
      this.products = this.products.filter((item) => item.id != id);
      return true;
    }
  }

  productFilter() {
    return {
      message: 'Algo',
    };
  }
}