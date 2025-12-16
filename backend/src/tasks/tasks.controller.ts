import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@ApiTags('Тесты')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({ summary: 'Get tasks'})
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
  create(@Body() taskDto: CreateTaskDto) {
    return this.tasksService.create(taskDto);
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
