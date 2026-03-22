import { ApiProperty } from '@nestjs/swagger';

export class PaginationMeta {
  @ApiProperty({ description: 'Текущая страница' })
  currentPage: number;

  @ApiProperty({ description: 'Количество элементов на странице' })
  itemsPerPage: number;

  @ApiProperty({ description: 'Общее количество элементов' })
  totalItems: number;

  @ApiProperty({ description: 'Общее количество страниц' })
  totalPages: number;

  @ApiProperty({ description: 'Есть ли следующая страница' })
  hasNextPage: boolean;

  @ApiProperty({ description: 'Есть ли предыдущая страница' })
  hasPreviousPage: boolean;
}

export class PaginatedResponse<T> {
  @ApiProperty({ description: 'Элементы текущей страницы' })
  data: T[];

  @ApiProperty({ type: () => PaginationMeta })
  pagination: PaginationMeta;
}
