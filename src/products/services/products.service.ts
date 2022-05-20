import { NotFoundException, Injectable } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  getAllProducts() {
    return this.productRepo.find();
  }

  getOneProduct(productId: number) {
    const product = this.productRepo.findOne(productId);

    if (!product) {
      throw new NotFoundException(`Product with ID# ${productId} not found`);
    }

    return product;
  }

  // createProduct(payload: CreateProductDto) {
  //   const newProduct = new this.productModel(payload);
  //   return newProduct.save();
  // }

  // updateProduct(id: string, payload: UpdateProductDto) {
  //   const product = this.productModel
  //     .findByIdAndUpdate(id, { $set: payload }, { new: true })
  //     .exec();
  //   if (!product) {
  //     throw new NotFoundException(`Product with ID# ${id} not found`);
  //   }
  //   return product;
  // }

  // deleteProduct(id: string) {
  //   const product = this.productModel.findByIdAndDelete(id);

  //   if (!product) {
  //     throw new NotFoundException(`Product with ID# ${id} not found`);
  //   }
  //   return product;
  // }
}
