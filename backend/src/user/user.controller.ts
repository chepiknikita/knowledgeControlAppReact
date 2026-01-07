import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './entities/user.model';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth-decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { parseMultipartJson } from 'src/utils/multipart.utils';
import {
  createFileInterceptorOptions,
  createFileValidators,
} from 'src/utils/file-upload.utils';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @ApiOperation({ summary: 'Get users' })
  // @ApiResponse({ status: 200, type: [User] })
  // @Get()
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  // async getAllUsers() {
  //   return await this.userService.getAllUsers();
  // }

  // @ApiOperation({ summary: 'Add user role' })
  // @ApiResponse({ status: 200 })
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  // @Post('/role')
  // async addRole(@Body() dto: AddRoleDto) {
  //   return await this.userService.addRole(dto);
  // }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: [User] })
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', createFileInterceptorOptions('USER_AVATAR')),
  )
  async update(
    @Param('id') id: number,
    @Body() body: { data: string },
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: createFileValidators('USER_AVATAR'),
      }),
    )
    image: File,
  ) {
    const userDto = parseMultipartJson(body.data);
    return await this.userService.update(id, userDto, image);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }
}
