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
import {
  createFileInterceptorOptions,
  createFileValidators,
} from 'src/utils/file-upload.utils';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { UpdateCredentialsDto } from './dto/update-credentials.dto';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Update user avatar' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Put(':id/avatar')
  @UseInterceptors(
    FileInterceptor('image', createFileInterceptorOptions('USER_AVATAR')),
  )
  async updateAvatar(
    @Param('id') id: number,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: createFileValidators('USER_AVATAR'),
      }),
    )
    image: File,
  ): Promise<Partial<User>> {
    const user = await this.userService.updateAvatar(id, image)
    return user.getUserResponse();
  }

  @ApiOperation({ summary: 'Update user credentials' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Put(':id/credentials')
  async updateCredentials(
    @Param('id') id: number,
    @Body() dto: UpdateCredentialsDto,
  ): Promise<Partial<User>> {
    const user = await this.userService.updateCredentials(id, dto);
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
