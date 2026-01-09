import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/role/entities/role.model';
import { UserRoles } from 'src/role/entities/user-roles.model';
import { Task } from 'src/tasks/entities/task.model';

interface UserCreationAttrs {
  login: string;
  password: string;
}

@Table({ tableName: 'users', createdAt: false, updatedAt: false })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Indentificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'nickname', description: 'Nickname user' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @ApiProperty({ example: '12345678', description: 'Password user' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'Аватар пользователя', description: 'User avatar' })
  @Column({ type: DataType.STRING, allowNull: true })
  avatar: string;
  
  @Column({ type: DataType.STRING, allowNull: true })
  refreshToken?: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Task)
  tasks: Task[];
}
