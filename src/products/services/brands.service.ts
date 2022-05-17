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

  createBrand(payload: CreateBrandDto) {
    const newBrand = new this.brandModel(payload);
    return newBrand.save();
  }

  updateBrand(id: string, changes: UpdateBrandDto) {
    const brand = this.brandModel.findByIdAndUpdate(
      id,
      { $set: changes },
      { new: true },
    );
    if (!brand) {
      throw new NotFoundException(`Product with ID# ${id} not found`);
    }
    return brand;
  }

  removeBrand(id: string) {
    const brand = this.brandModel.findByIdAndDelete(id);
    if (!brand) {
      throw new NotFoundException(`Product with ID# ${id} not found`);
    }
    return brand;
  }
}
