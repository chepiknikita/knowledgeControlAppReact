export class CreateAnswerDto {
  readonly id?: number;
  readonly text: string;
  readonly valid: boolean;
  questionId: number;
}
