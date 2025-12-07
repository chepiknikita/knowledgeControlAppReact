import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Answer } from 'src/question/entities/answer.model';
import { Task } from 'src/tasks/entities/task.model';

interface QuestionCreationAttrs {
  question: string;
  taskId: number;
}

@Table({ tableName: 'questions' })
export class Question extends Model<Question, QuestionCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Indentificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Вопрос к заданию', description: 'Question' })
  @Column({ type: DataType.STRING, allowNull: false })
  question: string;

  @ForeignKey(() => Task)
  @Column({ type: DataType.INTEGER, allowNull: false })
  taskId: number;

  @BelongsTo(() => Task)
  task: Task;

  @HasMany(() => Answer, { 
    foreignKey: 'questionId',
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE', 
    hooks: true 
  })
  answers: Answer[];
}
