import { CreateQuestionDto } from 'src/question/dto/create-question.dto';

export class CreateTaskDto {
  readonly image: string;
  readonly name: string;
  readonly description: string;
  readonly userId: string;
  readonly questions: CreateQuestionDto[];
}
