import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './entities/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth-decorator';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  @Roles('admin')
  @UseGuards(RolesGuard)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  // @ApiOperation({ summary: 'Create user' })
  // @ApiResponse({ status: 200, type: User })
  // @Post()
  // create(@Body() userDto: CreateUserDto) {
  //   return this.userService.createUser(userDto);
  // }

  @ApiOperation({ summary: 'Add user role' })
  @ApiResponse({ status: 200 })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }
}
