import { CreateAnswerDto } from "./create-answer.dto";

export class CreateQuestionDto {
  readonly id?  : number;
  readonly taskId: number; 
  readonly question: string;
  readonly answers: CreateAnswerDto[];
}
