import { NotFoundException, Injectable } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dto/products.dto';
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

  getAllProducts() {
    return this.products;
  }

  getOneProduct(productId: number) {
    const product = this.products.find((item) => item.id === productId);

    if (!product) {
      throw new NotFoundException(`Product with ID# ${productId} not found`);
    }

    return product;
  }

  createProduct(payload: CreateProductDto) {
    //console.log(payload);
    this.counterId += 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id: number, payload: UpdateProductDto) {
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
