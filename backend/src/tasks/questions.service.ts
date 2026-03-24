import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Question } from "src/tasks/entities/question.model";
import { AnswersService } from "./answers.service";
import { CreateQuestionDto } from "src/tasks/dto/create-question.dto";
import { Transaction } from "sequelize";
import { Task } from "./entities/task.model";
import { Answer } from "src/tasks/entities/answer.model";

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question)
    private readonly questionRepository: typeof Question,
    private readonly answersService: AnswersService,
  ) {}

  async createForTask(
    taskId: number,
    questions: CreateQuestionDto[],
    transaction: Transaction,
  ): Promise<void> {
    for (const dto of questions) {
      if (!dto.question) {
        throw new BadRequestException(`Вопрос не может быть пустым`);
      }

      const question = await this.questionRepository.create(
        {
          question: dto.question,
          taskId,
        },
        { transaction },
      );

      if (dto.answers?.length) {
        await this.answersService.sync(question, dto.answers, transaction);
      }
    }
  }

  async syncForTask(
    task: Task,
    dtoQuestions: CreateQuestionDto[],
    transaction: Transaction,
  ): Promise<void> {
    const existing = await task.$get('questions', { include: [Answer], transaction });
    const dtoIds = dtoQuestions
      .map(q => (q.id ? Number(q.id) : null))
      .filter(q => q !== null) as number[];

    for (const dto of dtoQuestions) {
      const questionId = dto.id ? Number(dto.id) : null;
      const existingQuestion = questionId ? existing.find(q => q.id === questionId) : null;

      if (existingQuestion) {
        await existingQuestion.update({ question: dto.question }, { transaction });
        await this.answersService.sync(existingQuestion, dto.answers ?? [], transaction, existingQuestion.answers);
      } else {
        await this.createForTask(task.id, [dto], transaction);
      }
    }

    for (const question of existing) {
      if (!dtoIds.includes(question.id)) {
        await question.destroy({ transaction });
      }
    }
  }
}
