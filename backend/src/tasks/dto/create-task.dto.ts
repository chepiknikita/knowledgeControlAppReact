import { Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateQuestionDto } from 'src/tasks/dto/create-question.dto';

export class CreateTaskDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly image?: string;

  @IsString()
  readonly description: string;

  @IsInt()
  @IsOptional()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  readonly questions: CreateQuestionDto[];
}
