import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.model';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from './entities/answer.model';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question) private questionRepository: typeof Question,
  ) {}

  async getAll() {
    return await this.questionRepository.findAll({ include: { all: true } });
  }

  async getQuestionById(id: number) {
    return await this.questionRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async create(dto: CreateQuestionDto) {
    const { answers, ...question } = dto;
    const res = await this.questionRepository.create(question);

    if (answers && answers.length > 0) {
      await res.$create('answers', answers);
    }

    return await this.questionRepository.findByPk(res.id, {
      include: [Answer]
    });
  }

  async edit(id: number, dto: CreateQuestionDto) {
    const {answers, ...question} = dto
    return await this.questionRepository.update(question, { where: { id } });
  }

  async delete(id: number) {
    return await this.questionRepository.destroy({ where: { id } });
  }
}
