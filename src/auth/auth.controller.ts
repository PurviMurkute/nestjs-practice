import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/user.dto';
import { AuthGuard } from './auth.guards';
import type { AuthenticatedRequest } from './dto/user.dto';

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
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    const userEmail: string = req.user.email;

    return this.authService.getProfile(userEmail);
  }
}
