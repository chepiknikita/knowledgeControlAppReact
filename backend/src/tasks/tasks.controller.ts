import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';

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
    FileInterceptor('image', {
      limits: {
        fileSize: 50 * 1024 * 1024,
        files: 1,
      },
      fileFilter: (req, file, cb) => {
        const allowedTypes = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
        ];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(new BadRequestException('Недопустимый тип файла'), false);
        }
        cb(null, true);
      },
    }),
  )
  create(
    @Body() body: { data: string },
    @UploadedFile(new ParseFilePipe({ fileIsRequired: false })) image: File,
  ) {
    let taskDto;
    try {
      taskDto = JSON.parse(body.data);
    } catch {
      throw new BadRequestException('Неверный формат данных');
    }
    return this.tasksService.create(taskDto, image);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('/:id')
  edit(@Body() taskDto: CreateTaskDto, @Param('id') id: number) {
    return this.tasksService.edit(id, taskDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.tasksService.delete(id);
  }
}
