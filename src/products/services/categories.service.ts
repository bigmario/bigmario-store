import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/products/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  findOne(id: number) {
    const category = this.categoryRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  // create(data: CreateCategoryDto) {
  //   const newCategory = new this.categoryModel(data);
  //   return newCategory.save();
  // }

  // update(id: string, changes: UpdateCategoryDto) {
  //   const category = this.categoryModel
  //     .findByIdAndUpdate(id, { $set: changes }, { new: true })
  //     .exec();
  //   if (!category) {
  //     throw new NotFoundException(`Product with ID# ${id} not found`);
  //   }
  //   return category;
  // }

  // remove(id: string) {
  //   const category = this.categoryModel.findByIdAndDelete(id);

  //   if (!category) {
  //     throw new NotFoundException(`Product with ID# ${id} not found`);
  //   }
  //   return category;
  // }
}
