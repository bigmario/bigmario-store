import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dto/brand.dto';
import { Model } from 'mongoose';
import { Brand } from 'src/products/entities/brand.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}
  getAllBrands() {
    return this.brandModel.find().exec();
  }

  getOneBrand(id: string) {
    const brand = this.brandModel.findById(id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found!`);
    }
    return brand;
  }

  // createBrand(payload: CreateBrandDto) {
  //   this.counterId = this.counterId + 1;
  //   const newBrand = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.brands.push(newBrand);
  //   return newBrand;
  // }

  // updateBrand(id: number, changes: UpdateBrandDto) {
  //   const brand = this.getOneBrand(id);
  //   const index = this.brands.findIndex((item) => item.id === id);
  //   this.brands[index] = {
  //     ...brand,
  //     ...changes,
  //   };
  //   return this.brands[index];
  // }

  // removeBrand(id: number) {
  //   const index = this.brands.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Brand #${id} not found`);
  //   }
  //   this.brands.splice(index, 1);
  //   return true;
  // }
}
