import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from './dto/course.dto';
import { RolesGuard } from 'src/common/guards/role.guards';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from 'src/user/user.types';
import type { AuthenticatedRequest } from 'src/auth/dto/user.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('create')
  create(@Body() CourseDto: CourseDto, @Req() req: AuthenticatedRequest) {
    const newCourse = this.courseService.createCourse(CourseDto, req.user.id);
    return newCourse;
  }

  @UseGuards(AuthGuard)
  @Get('all')
  findAll() {
    return this.courseService.fetchAllCourses();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.GetCourse(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: CourseDto) {
    return this.courseService.updateCourseById(id, updateCourseDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
