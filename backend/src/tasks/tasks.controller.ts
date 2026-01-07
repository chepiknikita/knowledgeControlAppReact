import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationFilterDto } from 'src/common/dto/pagination-filter.dto';
import { createFileInterceptorOptions } from 'src/utils/file-upload.utils';
import { parseMultipartJson } from 'src/utils/multipart.utils';

@ApiTags('Тесты')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({ summary: 'Get tasks' })
  // @ApiResponse({ status: 200, type: [Task] })
  @Get()
  getAll() {
    return this.tasksService.getAll();
  }

  @Get('user/:userId')
  getAllByUserId(@Param('userId') userId: number) {
    return this.tasksService.getAllByUserId(userId);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: number) {
    return this.tasksService.getTaskById(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', createFileInterceptorOptions('IMAGE')),
  )
  create(
    @Body() body: { data: string },
    @UploadedFile(new ParseFilePipe({ fileIsRequired: false })) image: File,
  ) {
    const taskDto = parseMultipartJson(body.data);
    return this.tasksService.create(taskDto, image);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @UseInterceptors(
    FileInterceptor('image', createFileInterceptorOptions('IMAGE')),
  )
  edit(
    @Param('id') id: number,
    @Body() body: { data: string },
    @UploadedFile(new ParseFilePipe({ fileIsRequired: false })) image: File,
  ) {
    const taskDto = parseMultipartJson(body.data);
    return this.tasksService.edit(id, taskDto, image);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.tasksService.delete(id);
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
}
