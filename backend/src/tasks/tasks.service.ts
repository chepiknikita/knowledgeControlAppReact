import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './entities/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { Question } from 'src/question/entities/question.model';
import { Answer } from 'src/question/entities/answer.model';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';
import { CreateAnswerDto } from 'src/question/dto/create-answer.dto';
import { User } from 'src/user/entities/user.model';
import { FileService } from 'src/file/file.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    @InjectModel(Question) private questionRepository: typeof Question,
    @InjectModel(Answer) private answerModel: typeof Answer,
    private fileService: FileService,
  ) {}

  async getAll() {
    return await this.taskRepository.findAll({
      include: [
        {
          model: Question,
        },
        {
          model: User,
          attributes: ['id', 'login', 'avatar'],
        },
      ],
    });
  }

  async getAllByUserId(userId: number) {
    return await this.taskRepository.findAll({
      where: { userId },
      include: [
        {
          model: Question,
        },
        {
          model: User,
          attributes: ['id', 'login', 'avatar'],
        },
      ],
    });
  }

  async getTaskById(id: number) {
    return await this.taskRepository.findOne({
      where: { id },
      include: [
        {
          model: Question,
          include: [Answer],
        },
        {
          model: User,
        },
      ],
    });
  }

  async create(dto: CreateTaskDto, image: File): Promise<Task> {
    const sequelize = this.taskRepository.sequelize;
    const transaction = await sequelize.transaction();

    try {
      const fileName = await this.fileService.createFile(image);
      const task = await this.taskRepository.create(
        {
          name: dto.name,
          description: dto.description,
          image: fileName,
          userId: dto.userId,
        },
        { transaction },
      );

      if (dto.questions && dto.questions.length > 0) {
        for (const questionDto of dto.questions) {
          const question = await this.questionRepository.create(
            {
              question: questionDto.question,
              taskId: task.id,
            },
            { transaction },
          );

          if (questionDto.answers && questionDto.answers.length > 0) {
            const answersData = questionDto.answers.map((answer) => ({
              text: answer.text,
              isCorrect: answer.isCorrect,
              questionId: question.id,
            }));

            await this.answerModel.bulkCreate(answersData, { transaction });
          }
        }
      }

      await transaction.commit();

      return await this.taskRepository.findByPk(task.id, {
        include: [
          {
            model: Question,
            include: [Answer],
          },
        ],
      });
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async edit(id: number, dto: CreateTaskDto) {
    const sequelize = this.taskRepository.sequelize;
    const transaction = await sequelize.transaction();

    try {
      const task = await this.taskRepository.findByPk(id, { transaction });

      if (!task) {
        throw new Error('Task not found');
      }

      if (dto.name !== undefined) task.name = dto.name;
      if (dto.description !== undefined) task.description = dto.description;
      if (dto.image !== undefined) task.image = dto.image;
      if (dto.userId !== undefined) task.userId = +dto.userId;

      await task.save({ transaction });

      if (dto.questions !== undefined) {
        await this.updateQuestions(task, dto.questions, transaction);
      }

      await transaction.commit();

      return await this.getTaskWithRelations(id);
    } catch (error) {
      await transaction.rollback();
      console.error('Error updating task:', error);
      throw error;
    }
  }

  private async updateQuestions(
    task: Task,
    questionsDto: CreateQuestionDto[],
    transaction: any,
  ) {
    const existingQuestions = await task.$get('questions', {
      include: [Answer],
      transaction,
    });

    for (const questionDto of questionsDto) {
      if (questionDto.id) {
        const existingQuestion = existingQuestions.find(
          (q) => q.id === questionDto.id,
        );
        if (existingQuestion) {
          await existingQuestion.update(
            { question: questionDto.question },
            { transaction },
          );
          await this.updateAnswers(
            existingQuestion,
            questionDto.answers || [],
            transaction,
          );
        }
      } else {
        const newQuestion = await this.questionRepository.create(
          {
            question: questionDto.question,
            taskId: task.id,
          },
          { transaction },
        );

        if (questionDto.answers && questionDto.answers.length > 0) {
          await this.answerModel.bulkCreate(
            questionDto.answers.map((answer) => ({
              text: answer.text,
              isCorrect: answer.isCorrect,
              questionId: newQuestion.id,
            })),
            { transaction },
          );
        }
      }
    }

    const dtoQuestionIds = questionsDto
      .filter((q) => q.id)
      .map((q) => q.id as number);

    for (const existingQuestion of existingQuestions) {
      if (!dtoQuestionIds.includes(existingQuestion.id)) {
        await existingQuestion.destroy({ transaction });
      }
    }
  }

  private async updateAnswers(
    question: Question,
    answersDto: CreateAnswerDto[],
    transaction: any,
  ) {
    const existingAnswers = await question.$get('answers', { transaction });

    for (const answerDto of answersDto) {
      if (answerDto.id) {
        const existingAnswer = existingAnswers.find(
          (a) => a.id === answerDto.id,
        );
        if (existingAnswer) {
          existingAnswer.text = answerDto.text;
          existingAnswer.isCorrect =
            answerDto.isCorrect !== undefined
              ? answerDto.isCorrect
              : existingAnswer.isCorrect;
          await existingAnswer.save({ transaction });
        }
      } else {
        await this.answerModel.create(
          {
            text: answerDto.text,
            valid: answerDto.isCorrect || false,
            questionId: question.id,
          },
          { transaction },
        );
      }
    }

    const dtoAnswerIds = answersDto
      .filter((a) => a.id)
      .map((a) => a.id as number);

    for (const existingAnswer of existingAnswers) {
      if (!dtoAnswerIds.includes(existingAnswer.id)) {
        await existingAnswer.destroy({ transaction });
      }
    }
  }

  private async getTaskWithRelations(taskId: number): Promise<Task> {
    return await this.taskRepository.findByPk(taskId, {
      include: [
        {
          model: Question,
          include: [Answer],
        },
      ],
    });
  }

  async delete(id: number) {
    return await this.taskRepository.destroy({ where: { id } });
  }
}
