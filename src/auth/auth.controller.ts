import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    const createdUser = this.authService.registerUser(registerUserDto);
    return createdUser;
  }
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    const loggedInUser = this.authService.loginUser(loginUserDto);
    return loggedInUser;
  }
}
