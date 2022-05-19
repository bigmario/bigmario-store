import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateSubDocDto } from './sub-doc.dto';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @ValidateNested()
  @Type(() => CreateSubDocDto)
  readonly skills: CreateSubDocDto[];
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
