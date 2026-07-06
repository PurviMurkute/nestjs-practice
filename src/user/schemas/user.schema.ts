import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserRole } from '../user.types';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id!: Types.ObjectId;
  @Prop({ required: true })
  username!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true, default: UserRole.STUDENT })
  role!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
