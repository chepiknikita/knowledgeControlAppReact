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
    preloadedAnswers?: Answer[],
  ): Promise<void> {
    const existing = preloadedAnswers ?? await question.$get('answers', { transaction });
    const dtoIds = dtoAnswers
      .map(a => (a.id ? Number(a.id) : null))
      .filter(a => a !== null) as number[];

    for (const dto of dtoAnswers) {
      if (!dto.text) continue;

      const answerId = dto.id ? Number(dto.id) : null;
      const existingAnswer = answerId ? existing.find(a => a.id === answerId) : null;

      if (existingAnswer) {
        const updateData: Partial<Answer> = {
          text: dto.text,
          isCorrect: dto.isCorrect ?? false,
        };
        await existingAnswer.update(updateData, { transaction });
        
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
