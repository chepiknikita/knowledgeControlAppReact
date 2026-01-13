import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Put,
  Request,
  UploadedFile,
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
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', createFileInterceptorOptions('USER_AVATAR')),
  )
  async update(
    @Param('id') id: number,
    @Body() body: { data: string },
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: createFileValidators('USER_AVATAR'),
      }),
    )
    image: File,
  ): Promise<Partial<User>> {
    const userDto = parseMultipartJson(body?.data);
    const user = await this.userService.update(id, image, userDto)
    return user.getUserResponse();
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<Partial<User>> {
    const user = await this.userService.getUserById(req.user.id);
    return user.getUserResponse();
  }
}
