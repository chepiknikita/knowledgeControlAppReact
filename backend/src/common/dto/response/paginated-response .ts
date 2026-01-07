import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponse<T> {
  @ApiProperty({ description: 'Элементы текущей страницы' })
  data: T[];

  @ApiProperty({ description: 'Текущая страница' })
  currentPage: number;

  @ApiProperty({ description: 'Количество элементов на странице' })
  limit: number;

  @ApiProperty({ description: 'Общее количество элементов' })
  totalItems: number;

  @ApiProperty({ description: 'Общее количество страниц' })
  totalPages: number;

  @ApiProperty({ description: 'Есть ли следующая страница' })
  hasNext: boolean;

  @ApiProperty({ description: 'Есть ли предыдущая страница' })
  hasPrev: boolean;
}