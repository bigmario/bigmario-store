import { NotFoundException, Injectable } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  getAllProducts() {
    return this.productRepo.find();
  }

  async getOneProduct(productId: number) {
    const product = await this.productRepo.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID# ${productId} not found`);
    }

    return product;
  }

  createProduct(payload: CreateProductDto) {
    // const newProduct = new Product();
    // newProduct.name = payload.name;
    // newProduct.description = payload.description;
    // newProduct.price = payload.price;
    // newProduct.stock = payload.stock;
    // newProduct.image = payload.image;
    const newProduct = this.productRepo.create(payload);
    return this.productRepo.save(newProduct);
  }

  async updateProduct(id: number, payload: UpdateProductDto) {
    const product = await this.productRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID# ${id} not found`);
    }

    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  async deleteProduct(id: number) {
    const product = await this.getOneProduct(id);

    if (!product) {
      throw new NotFoundException(`Product with ID# ${id} not found`);
    }

    return this.productRepo.delete(id);
  }
}
