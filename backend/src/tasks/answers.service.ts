import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Transaction } from "sequelize";
import { CreateAnswerDto } from "src/tasks/dto/create-answer.dto";
import { Answer } from "src/tasks/entities/answer.model";
import { Question } from "src/tasks/entities/question.model";

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer)
    private readonly answerRepository: typeof Answer,
  ) {}

  async sync(
    question: Question,
    dtoAnswers: CreateAnswerDto[],
    transaction: Transaction,
  ): Promise<void> {
    const existing = await question.$get('answers', { transaction });
    const dtoIds = dtoAnswers.filter(a => a.id).map(a => a.id!);

    for (const dto of dtoAnswers) {
      if (dto.id) {
        const answer = existing.find(a => a.id === dto.id);
        if (!answer) continue;

        await answer.update(
          {
            text: dto.text,
            isCorrect: dto.isCorrect,
          },
          { transaction },
        );
      } else {
        await this.answerRepository.create(
          {
            text: dto.text,
            isCorrect: dto.isCorrect ?? false,
            questionId: question.id,
          },
          { transaction },
        );
      }
    }

    for (const answer of existing) {
      if (!dtoIds.includes(answer.id)) {
        await answer.destroy({ transaction });
      }
    }
  }
}
