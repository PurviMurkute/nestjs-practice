import { BadRequestException, Injectable } from '@nestjs/common';
import { CourseDto } from './dto/course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schema';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}
  createCourse(CourseDto: CourseDto, userId: string) {
    const { title, description, image, price } = CourseDto;
    if (!title || !description || !image || price === undefined) {
      throw new BadRequestException('Missing required fields');
    }
    const newCourse = new this.courseModel({ ...CourseDto, createdBy: userId });
    newCourse.save();
    return newCourse;
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, CourseDto: CourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
