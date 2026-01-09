import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.model';
import { Task } from 'src/tasks/entities/task.model';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from 'src/role/entities/role.model';
import { UserRoles } from 'src/role/entities/user-roles.model';
import { RoleModule } from 'src/role/role.module';
import { FileModule } from 'src/file/file.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Task]),
    RoleModule,
    FileModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
