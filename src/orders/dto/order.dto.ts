import { IsNotEmpty, IsDate } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

export class CreateOrderDto {
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  customer: User;

  @ApiProperty()
  @IsNotEmpty()
  products: Product[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
