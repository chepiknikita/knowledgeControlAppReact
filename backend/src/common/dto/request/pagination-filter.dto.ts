import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FilterDto } from './filter.dto';
import { SortDto } from './sort.dto';

export class PaginationFilterDto {
  @ApiProperty({
    description: 'Номер страницы',
    required: false,
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    description: 'Количество элементов на странице',
    required: false,
    default: 10,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({
    description: 'Массив фильтров',
    type: [FilterDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilterDto)
  filters?: FilterDto[];

  @ApiProperty({
    description: 'Массив сортировок',
    type: [SortDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SortDto)
  sorts?: SortDto[];

  @ApiProperty({
    description: `Связанные сущности для загрузки (через запятую)
    
    Позволяет загрузить связанные данные в одном запросе.
    
    Примеры:
    • include=user - загрузить пользователя
    • include=questions,questions.answers - загрузить вопросы с ответами
    • include=author,comments,comments.user - цепочка связей`,
    required: false,
    example: 'user,questions,questions.answers',
  })
  @IsOptional()
  @IsString()
  include?: string;

  @ApiProperty({
    description: `Поля для выборки (через запятую)
    
    Указывает, какие поля должны быть возвращены в ответе.
    Уменьшает размер ответа и повышает производительность.
    
    Примеры:
    • fields=id,name - только идентификатор и имя
    • fields=id,name,createdAt - базовые поля
    • fields=* - все поля (по умолчанию)`,
    required: false,
    example: 'id,name,createdAt',
  })
  @IsOptional()
  @IsString()
  fields?: string;
}
