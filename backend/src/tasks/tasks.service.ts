import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './entities/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { Question } from 'src/tasks/entities/question.model';
import { Answer } from 'src/tasks/entities/answer.model';
import { User } from 'src/user/entities/user.model';
import { FileService } from 'src/file/file.service';
import { BaseService } from 'src/common/base/base.service';
import { PaginationFilterDto } from 'src/common/dto/request/pagination-filter.dto';
import { QuestionsService } from './questions.service';
import { Transaction } from 'sequelize';

@Injectable()
export class TasksService extends BaseService<Task> {
  protected model = this.taskRepository;

  constructor(
    @InjectModel(Task) private readonly taskRepository: typeof Task,
    private readonly fileService: FileService,
    private readonly questionsService: QuestionsService,
  ) {
    super();
  }

  async getTaskById(id: number): Promise<Task | null> {
    return this.findTaskWithRelations(id, true);
  }

  async create(dto: CreateTaskDto, image?: Express.Multer.File): Promise<Task> {
    const imageName = image ? await this.fileService.createFile(image) : null;

    try {
      return await this.withTransaction(async (transaction) => {
        const task = await this.taskRepository.create(
          {
            name: dto.name,
            description: dto.description,
            image: imageName,
            userId: dto.userId,
          },
          { transaction },
        );

        if (dto.questions?.length) {
          await this.questionsService.createForTask(task.id, dto.questions, transaction);
        }

        return this.findTaskWithRelations(task.id);
      });
    } catch (error) {
      if (imageName) {
        await this.fileService.deleteFile(imageName).catch(() => {});
      }
      throw error;
    }
  }

  async update(id: number, dto: CreateTaskDto, image?: Express.Multer.File): Promise<Task> {
    const task = await this.findByIdOrFail(id);
    const oldImageName = task.image;

    let newImageName: string | null = null;
    if (image) {
      newImageName = await this.fileService.createFile(image);
    }

    const updateData: Partial<Task> = {
      name: dto.name,
      description: dto.description,
      userId: dto.userId,
      ...(newImageName ? { image: newImageName } : {}),
    };

    try {
      await this.withTransaction(async (transaction) => {
        await task.update(updateData, { transaction });

        if (dto.questions?.length) {
          await this.questionsService.syncForTask(task, dto.questions, transaction);
        }
      });
    } catch (error) {
      if (newImageName) {
        await this.fileService.deleteFile(newImageName).catch(() => {});
      }
      throw error;
    }

    if (newImageName && oldImageName) {
      await this.fileService.deleteFile(oldImageName).catch(() => {});
    }

    return this.findTaskWithRelations(id);
  }

  async delete(id: number): Promise<void> {
    let imageToDelete: string | null = null;

    await this.withTransaction(async (transaction) => {
      const task = await this.findByIdOrFail(id, transaction);

      imageToDelete = task.image;
      await task.destroy({ transaction });
    });

    if (imageToDelete) {
      await this.fileService.deleteFile(imageToDelete);
    }
  }

  private async withTransaction<T>(
    callback: (transaction: Transaction) => Promise<T>,
  ): Promise<T> {
    const transaction = await this.taskRepository.sequelize.transaction();

    try {
      const result = await callback(transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  private findTaskWithRelations(
    taskId: number,
    withUser = false,
  ): Promise<Task | null> {
    return this.taskRepository.findByPk(taskId, {
      include: [
        {
          model: Question,
          include: [Answer],
        },
        ...(withUser ? [{ model: User }] : []),
      ],
    });
  }

  private static readonly ALLOWED_FILTER_FIELDS = ['name', 'description', 'createdAt', 'userId'];

  async getAllFilteredProfile(userId: number, query: PaginationFilterDto) {
    return this.findAllPaginatedInternal(query, { userId }, TasksService.ALLOWED_FILTER_FIELDS);
  }

  public async findAllPaginated(query: PaginationFilterDto) {
    return this.findAllPaginatedInternal(query, {}, TasksService.ALLOWED_FILTER_FIELDS);
  }

  private async findByIdOrFail(
    id: number,
    transaction?: Transaction,
  ): Promise<Task> {
    const task = await this.taskRepository.findByPk(id, { transaction });

    if (!task) {
      throw new NotFoundException('Задание не найдено');
    }

    return task;
  }
}
