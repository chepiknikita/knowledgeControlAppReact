import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './entities/question.model';
import { Task } from 'src/tasks/entities/task.model';
import { Answer } from './entities/answer.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [QuestionService],
  controllers: [QuestionController],
  imports: [
    AuthModule,
    SequelizeModule.forFeature([Question, Task, Answer]),
  ],
})
export class QuestionModule {}
