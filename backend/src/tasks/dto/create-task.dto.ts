import { CreateQuestionDto } from 'src/question/dto/create-question.dto';

export class CreateTaskDto {
  readonly name: string;
  readonly image: string;
  readonly description: string;
  readonly userId: string;
  readonly questions: CreateQuestionDto[];
}
