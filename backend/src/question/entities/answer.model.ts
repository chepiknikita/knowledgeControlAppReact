import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Question } from 'src/question/entities/question.model';

interface AnswerCreation {
  text: string;
  isCorrect: boolean;
  questionId: number;
}

@Table({ tableName: 'answers' })
export class Answer extends Model<Answer, AnswerCreation> {
  @ApiProperty({ example: '1', description: 'Indentificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Текс ответа', description: 'Answer text' })
  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @ApiProperty({ example: 'Флаг правильного варианта', description: 'isCorrect' })
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isCorrect: boolean;

  @ForeignKey(() => Question)
  @Column({ type: DataType.INTEGER, allowNull: false })
  questionId: number;

  @BelongsTo(() => Question)
  question: Question;
}
