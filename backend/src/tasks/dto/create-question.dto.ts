import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateAnswerDto } from "./create-answer.dto";

export class CreateQuestionDto {
  @IsOptional()
  @IsInt()
  readonly id?: number;

  @IsOptional()
  @IsInt()
  readonly taskId?: number;

  @IsString()
  @MinLength(1)
  readonly question: string;

  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  readonly answers: CreateAnswerDto[];
}
