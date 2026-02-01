import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.model';
import { Task } from './entities/task.model';
import { Question } from 'src/tasks/entities/question.model';
import { Answer } from 'src/tasks/entities/answer.model';
import { FileModule } from 'src/file/file.module';
import { AuthModule } from 'src/auth/auth.module';
import { QuestionsService } from './questions.service';
import { AnswersService } from './answers.service';

@Module({
  providers: [TasksService, QuestionsService, AnswersService],
  controllers: [TasksController],
  imports: [
    SequelizeModule.forFeature([Task, Question, Answer, User]),
    FileModule,
    AuthModule,
  ],
})
export class TasksModule {}
