import { IsNumber, IsString } from 'class-validator';

export class CourseDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  image!: string;

  @IsNumber()
  price!: number;
}
