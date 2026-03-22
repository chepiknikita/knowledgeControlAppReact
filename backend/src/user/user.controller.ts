import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseFilePipe,
  ParseIntPipe,
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
import { SelfOnlyGuard } from './self-only-guard';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Update user avatar' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard, SelfOnlyGuard)
  @HttpCode(HttpStatus.OK)
  @Put(':id/avatar')
  @UseInterceptors(
    FileInterceptor('image', createFileInterceptorOptions('USER_AVATAR')),
  )
  async updateAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: createFileValidators('USER_AVATAR'),
      }),
    )
    image: Express.Multer.File,
  ): Promise<Partial<User>> {
    const user = await this.userService.updateAvatar(id, image)
    return user.getUserResponse();
  }

  @ApiOperation({ summary: 'Update user credentials' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard, SelfOnlyGuard)
  @HttpCode(HttpStatus.OK)
  @Put(':id/credentials')
  async updateCredentials(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCredentialsDto,
  ): Promise<Partial<User>> {
    const user = await this.userService.updateCredentials(id, dto);
    return user.getUserResponse();
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204 })
  @UseGuards(JwtAuthGuard, SelfOnlyGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.delete(id);
  } 

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async getProfile(@Request() req: { user: { id: number } }): Promise<Partial<User>> {
    const user = await this.userService.getUserById(req.user.id);
    if (!user) throw new NotFoundException('Пользователь не найден');
    return user.getUserResponse();
  }
}
