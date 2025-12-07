import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.model';
import { Task } from './entities/task.model';
import { Question } from 'src/question/entities/question.model';
import { Answer } from 'src/question/entities/answer.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Task, Question, Answer, User]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
