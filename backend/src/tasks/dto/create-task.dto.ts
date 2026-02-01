import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { CreateQuestionDto } from 'src/tasks/dto/create-question.dto';

export class CreateTaskDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly image: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  readonly questions: CreateQuestionDto[];
}
