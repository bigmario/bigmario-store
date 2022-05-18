import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Product } from 'src/products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Schema()
export class Order extends Document {
  @Prop()
  date: Date;

  @Prop()
  customer: User;

  @Prop()
  products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
