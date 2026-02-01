export class CreateAnswerDto {
  readonly id?: number;
  readonly text: string;
  readonly isCorrect: boolean;
  readonly questionId: number;
}
