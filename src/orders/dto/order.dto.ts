import { IsNotEmpty, IsDate, IsArray } from 'class-validator';

import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class CreateOrderDto {
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly customer: User;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products']),
) {}

export class AddProductsToOrderDto {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  readonly productsIds: string[];
}
