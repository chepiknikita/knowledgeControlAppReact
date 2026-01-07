import {
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// Типы операций для фильтрации
export enum FilterOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'not_contains',
  STARTS_WITH = 'starts_with',
  ENDS_WITH = 'ends_with',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  GREATER_THAN_OR_EQUAL = 'greater_than_or_equal',
  LESS_THAN_OR_EQUAL = 'less_than_or_equal',
  IN = 'in',
  NOT_IN = 'not_in',
  IS_NULL = 'is_null',
  IS_NOT_NULL = 'is_not_null',
  BETWEEN = 'between',
}

export type FilterValue =
  | string
  | number
  | boolean
  | Date
  | Array<string | number>;

export class FilterDto {
  @ApiProperty({
    description: 'Поле для фильтрации',
    example: 'name',
  })
  @IsString()
  field: string;

  @ApiProperty({
    description: 'Оператор фильтрации',
    enum: FilterOperator,
    example: FilterOperator.CONTAINS,
  })
  @IsEnum(FilterOperator)
  operator: FilterOperator;

  @ApiProperty({
    description: 'Значение для фильтрации',
    required: false,
    example: 'task',
  })
  @IsOptional()
  value?: FilterValue;

  @ApiProperty({
    description: 'Второе значение для оператора BETWEEN',
    required: false,
    example: '2024-12-31',
  })
  @IsOptional()
  value2?: FilterValue;

  @ApiProperty({
    description: 'Тип значения (для корректного преобразования)',
    enum: ['string', 'number', 'boolean', 'date', 'array'],
    required: false,
    default: 'string',
  })
  @IsOptional()
  @IsEnum(['string', 'number', 'boolean', 'date', 'array'])
  valueType?: string = 'string';
}
