import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class SortDto {
  @ApiProperty({
    description: 'Поле для сортировки',
    example: 'createdAt',
  })
  @IsString()
  field: string;

  @ApiProperty({
    description: 'Порядок сортировки',
    enum: SortOrder,
    example: SortOrder.DESC,
  })
  @IsEnum(SortOrder)
  order: SortOrder = SortOrder.DESC;
}
