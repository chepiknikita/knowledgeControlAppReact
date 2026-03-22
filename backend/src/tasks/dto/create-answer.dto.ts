import { IsBoolean, IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateAnswerDto {
  @IsOptional()
  @IsInt()
  readonly id?: number;

  @IsString()
  @MinLength(1)
  readonly text: string;

  @IsBoolean()
  readonly isCorrect: boolean;

  @IsOptional()
  @IsInt()
  readonly questionId?: number;
}
