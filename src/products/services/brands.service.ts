import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from 'src/products/entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}
  getAllBrands() {
    return this.brandRepo.find();
  }

  getOneBrand(id: number) {
    const brand = this.brandRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found!`);
    }
    return brand;
  }

  // createBrand(payload: CreateBrandDto) {
  //   const newBrand = new this.brandModel(payload);
  //   return newBrand.save();
  // }

  // updateBrand(id: string, changes: UpdateBrandDto) {
  //   const brand = this.brandModel.findByIdAndUpdate(
  //     id,
  //     { $set: changes },
  //     { new: true },
  //   );
  //   if (!brand) {
  //     throw new NotFoundException(`Product with ID# ${id} not found`);
  //   }
  //   return brand;
  // }

  // removeBrand(id: string) {
  //   const brand = this.brandModel.findByIdAndDelete(id);
  //   if (!brand) {
  //     throw new NotFoundException(`Product with ID# ${id} not found`);
  //   }
  //   return brand;
  // }
}
