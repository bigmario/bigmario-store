import { NotFoundException, Injectable } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from 'src/products/dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  getAllProducts(params?: FilterProductsDto) {
    if (params) {
      const filters: FilterQuery<Product> = {};
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice };
      }
      return this.productModel
        .find(filters)
        .populate('brand')
        .skip(offset)
        .limit(limit)
        .exec();
    }
    return this.productModel.find().populate('brand').exec();
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
