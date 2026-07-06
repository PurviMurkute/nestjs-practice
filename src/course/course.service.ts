import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CourseDto } from './dto/course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course } from './schemas/course.schema';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}
  async createCourse(CourseDto: CourseDto, userId: string) {
    const { title, description, image, price } = CourseDto;
    if (!title || !description || !image || price === undefined) {
      throw new BadRequestException('Missing required fields');
    }
    const newCourse = new this.courseModel({ ...CourseDto, createdBy: userId });
    await newCourse.save();
    return newCourse;
  }

  fetchAllCourses() {
    return this.courseModel.find().exec();
  }

  async GetCourse(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid course id');
    }

    return await this.courseModel.findById(id).exec();
  }

  async updateCourseById(id: string, CourseDto: CourseDto) {
    const { title, description, image, price } = CourseDto;
    if (!title || !description || !image || price === undefined) {
      throw new BadRequestException('Missing required fields');
    }

    try {
      const updatedCourse = await this.courseModel
        .findByIdAndUpdate(
          id,
          { title, description, image, price },
          { new: true },
        )
        .exec();

      return {
        message: 'Course Updated Successfull',
        course: updatedCourse,
        statusCode: 200,
      };
    } catch (error: any) {
      throw new BadRequestException('Error updating course', error);
    }
  }

  async remove(id: string) {
    try {
      const course = await this.courseModel.findById(id);

      if (!course) {
        throw new NotFoundException('Course not found');
      }

      await this.courseModel.findOneAndDelete({ _id: id });

      return {
        message: 'Course deleted successfully',
        statusCode: 200,
        course,
      };
    } catch (error: any) {
      throw new BadRequestException('Error deleting course', error);
    }
  }
}
