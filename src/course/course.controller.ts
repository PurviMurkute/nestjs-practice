import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from './dto/course.dto';
import { RolesGuard } from 'src/common/guards/role.guards';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from 'src/user/user.types';
import type { AuthenticatedRequest } from 'src/auth/dto/user.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('create')
  create(@Body() CourseDto: CourseDto, @Req() req: AuthenticatedRequest) {
    const newCourse = this.courseService.createCourse(CourseDto, req.user.id);
    return newCourse;
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: CourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
