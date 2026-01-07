import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './entities/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { Question } from 'src/question/entities/question.model';
import { Answer } from 'src/question/entities/answer.model';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';
import { CreateAnswerDto } from 'src/question/dto/create-answer.dto';
import { User } from 'src/user/entities/user.model';
import { FileService } from 'src/file/file.service';
import { BaseService } from 'src/common/base/base.service';

@Injectable()
export class TasksService extends BaseService<Task> {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    @InjectModel(Question) private questionRepository: typeof Question,
    @InjectModel(Answer) private answerModel: typeof Answer,
    private fileService: FileService,
  ) {
    super();
  }

  protected model = this.taskRepository;

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

  async edit(id: number, dto: CreateTaskDto, image: File): Promise<Task> {
    const sequelize = this.taskRepository.sequelize;
    const transaction = await sequelize.transaction();

    try {
      const task = await this.taskRepository.findByPk(id, { transaction });

      if (!task) {
        throw new Error('Task not found');
      }

      let fileName = task.image;
      if (image) {
        if (task.image) {
          await this.fileService.deleteFile(task.image);
        }
        fileName = await this.fileService.createFile(image);
      }

      const updateData: Partial<Task> = {};

      if (dto.name !== undefined) updateData.name = dto.name;
      if (dto.description !== undefined)
        updateData.description = dto.description;
      if (dto.userId !== undefined) updateData.userId = parseInt(dto.userId);
      if (image) updateData.image = fileName;

      if (Object.keys(updateData).length > 0) {
        await task.update(updateData, { transaction });
      }

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
          const updateData: Partial<Answer> = {};

          if (answerDto.text !== undefined) updateData.text = answerDto.text;
          if (answerDto.isCorrect !== undefined)
            updateData.isCorrect = answerDto.isCorrect;

          if (Object.keys(updateData).length > 0) {
            await existingAnswer.update(updateData, { transaction });
          }
        }
      } else {
        await this.answerModel.create(
          {
            text: answerDto.text,
            isCorrect: answerDto.isCorrect ?? false,
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
    const sequelize = this.taskRepository.sequelize;
    const transaction = await sequelize.transaction();

    try {
      const task = await this.taskRepository.findByPk(id, {
        include: [Question],
        transaction,
      });

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      await this.taskRepository.destroy({
        where: { id },
        transaction,
      });

      if (task.image) {
        await this.fileService.deleteFile(task.image);
      }

      await transaction.commit();

      return {
        message: 'Task deleted successfully',
        deleted: true,
      };
    } catch (error) {
      await transaction.rollback();
      console.error('Error deleting task:', error);

      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete task');
    }
  }
}
