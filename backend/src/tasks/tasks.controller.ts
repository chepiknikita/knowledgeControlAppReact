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
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationFilterDto } from 'src/common/dto/request/pagination-filter.dto';
import { createFileInterceptorOptions } from 'src/utils/file-upload.utils';
import { parseMultipartJson } from 'src/utils/multipart.utils';

@ApiTags('Тесты')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    const task = await this.tasksService.getTaskById(id);
    if (!task) throw new NotFoundException('Задание не найдено');
    return task;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', createFileInterceptorOptions('IMAGE')),
  )
  async create(
    @Body() body: { data: string },
    @UploadedFile(new ParseFilePipe({ fileIsRequired: false })) image: Express.Multer.File,
  ) {
    const taskDto = parseMultipartJson(body.data);
    return await this.tasksService.create(taskDto, image);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  @UseInterceptors(
    FileInterceptor('image', createFileInterceptorOptions('IMAGE')),
  )
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { data: string },
    @UploadedFile(new ParseFilePipe({ fileIsRequired: false })) image: Express.Multer.File,
  ) {
    const taskDto = parseMultipartJson(body.data);
    return await this.tasksService.edit(id, taskDto, image);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.tasksService.delete(id);
  }

  @Post('filter')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Фильтрация задач' })
  @ApiBody({ type: PaginationFilterDto })
  async filter(
    @Body(new ValidationPipe({ transform: true })) request: PaginationFilterDto,
  ) {
    return await this.tasksService.findAllPaginated(request);
  }

  @UseGuards(JwtAuthGuard)
  @Post('filter/user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Фильтрация задач пользователя' })
  @ApiBody({ type: PaginationFilterDto })
  async getAllFilteredProfile(
    @Req() req: { user: { id: number } },
    @Body(new ValidationPipe({ transform: true })) request: PaginationFilterDto,
  ) {
    return await this.tasksService.getAllFilteredProfile(req.user.id, request);
  }
}
