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
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

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

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateQuestionDto) {
    return this.questionService.create(dto);
  }

  // @UseGuards(JwtAuthGuard) 
  @Put('/:id')
  edit(@Body() dto: CreateQuestionDto, @Param('id') id: number) {
    return this.questionService.edit(id, dto);
  }

  // @UseGuards(JwtAuthGuard) 
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.questionService.delete(id);
  }
}
