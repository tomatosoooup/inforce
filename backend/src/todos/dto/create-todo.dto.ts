import { Status } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @Min(4, { message: 'Min length for name is 4 characters' })
  @Max(50, { message: 'Max length is 50 characters' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @Min(10, { message: 'Min length for name is 10 characters' })
  @Max(200, { message: 'Max length is 200 characters' })
  description: string;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @IsString()
  @IsNotEmpty()
  boardId: string;
}
