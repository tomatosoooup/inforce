import { IsString, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  @Min(2, { message: 'Min length for name is 2 characters' })
  @Max(30, { message: 'Max length is 30 characters' })
  name: string;
}
