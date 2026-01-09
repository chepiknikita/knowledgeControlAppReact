import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Put,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './entities/user.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { parseMultipartJson } from 'src/utils/multipart.utils';
import {
  createFileInterceptorOptions,
  createFileValidators,
} from 'src/utils/file-upload.utils';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.getUserById(req.user.id);
    return user;
  }
}
