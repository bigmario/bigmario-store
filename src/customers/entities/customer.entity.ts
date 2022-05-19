import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Customer extends Document {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({
    type: [{ name: { type: String }, level: { type: String } }],
  })
  skills: Types.Array<Record<string, any>>;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
