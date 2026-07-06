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
import type { AuthenticatedRequest } from './dto/user.dto';
import { AuthGuard } from 'src/common/guards/auth.guards';

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
    const userId: string = req.user.id;

    return this.authService.getProfile(userId);
  }
}
