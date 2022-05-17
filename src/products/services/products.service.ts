import { NotFoundException, Injectable } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  getAllProducts() {
    return this.productModel.find().exec();
  }

  async getOneProduct(productId: string) {
    const product = await this.productModel.findById(productId).exec();

    if (!product) {
      throw new NotFoundException(`Product with ID# ${productId} not found`);
    }

    return product;
  }

  createProduct(payload: CreateProductDto) {
    const newProduct = new this.productModel(payload);
    return newProduct.save();
  }

  updateProduct(id: string, payload: UpdateProductDto) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product with ID# ${id} not found`);
    }
    return product;
  }

  deleteProduct(id: string) {
    const product = this.productModel.findByIdAndDelete(id);

    if (!product) {
      throw new NotFoundException(`Product with ID# ${id} not found`);
    }
    return product;
  }
}
