import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get()
  getAll() {
    return this.questionService.getAll();
  }

  @Get('/:id')
  getQuestionById(@Param('id') id: number) {
    return this.questionService.getQuestionById(id);
  }

  @Post()
  create(@Body() dto: CreateQuestionDto) {
    return this.questionService.create(dto);
  }

  @Put('/:id')
  edit(@Body() dto: CreateQuestionDto, @Param('id') id: number) {
    return this.questionService.edit(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.questionService.delete(id);
  }
}
