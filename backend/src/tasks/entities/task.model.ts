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
import { Question } from 'src/question/entities/question.model';
import { User } from 'src/user/entities/user.model';

interface TaskCreationAttrs {
  name: string;
  description: string;
  image: string;
  userId: string;
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Indentificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Имя задания', description: 'Name task' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Описание задания', description: 'description task' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: 'Изображение.png', description: 'image task' })
  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Question, { 
    foreignKey: 'taskId',
    onDelete: 'CASCADE'
  })
  questions: Question[];
}
