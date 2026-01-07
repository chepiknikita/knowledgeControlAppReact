import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';

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
