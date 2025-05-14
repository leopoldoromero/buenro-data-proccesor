import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class IngestedDataDocumentSchema {
  static readonly modelName = 'IngestedData';
  @Prop({ required: true })
  version: string;

  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: false })
  name?: string;

  @Prop({ required: false })
  country?: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  isAvailable: boolean;

  @Prop({ required: false, enum: ['high', 'medium', 'low'] })
  priceSegment?: 'high' | 'medium' | 'low';

  @Prop({ required: true })
  pricePerNight: number;

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  ingestedAt: Date;
}

export type IngestedDataDocument = IngestedDataDocumentSchema & Document;
export const IngestedDataMongoSchema = SchemaFactory.createForClass(
  IngestedDataDocumentSchema,
);
