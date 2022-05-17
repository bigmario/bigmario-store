import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Category } from 'src/products/entities/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  findAll() {
    return this.categoryModel.find().exec();
  }

  findOne(id: string) {
    const category = this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    const newCategory = new this.categoryModel(data);
    return newCategory.save();
  }

  update(id: string, changes: UpdateCategoryDto) {
    const category = this.categoryModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!category) {
      throw new NotFoundException(`Product with ID# ${id} not found`);
    }
    return category;
  }

  remove(id: string) {
    const category = this.categoryModel.findByIdAndDelete(id);

    if (!category) {
      throw new NotFoundException(`Product with ID# ${id} not found`);
    }
    return category;
  }
}
