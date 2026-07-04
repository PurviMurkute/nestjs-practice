import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser({ username, email, password }: RegisterUserDto) {
    await this.userModel.create({ username, email, password });
    return { data: { username, email }, message: 'User created successfully' };
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }
}
