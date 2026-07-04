import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async registerUser(registerUserDto: RegisterUserDto) {
    const { username, email, password } = registerUserDto;

    if (!username || !email || !password) {
      return { message: 'Username, email, and password are required' };
    }

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      return { message: 'Email already exists' };
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await this.userService.createUser({
      username,
      email,
      password: hashedPassword,
    });
    return user;
  }
}
