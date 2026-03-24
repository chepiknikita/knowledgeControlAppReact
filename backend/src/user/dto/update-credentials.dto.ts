import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCredentialsDto {
  @ApiPropertyOptional({ example: 'login', description: 'Login user' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  @Length(5, 20, { message: 'Не меньше 5 и не больше 20' })
  readonly login?: string;

  @ApiPropertyOptional({ example: '12345678', description: 'Current password user' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  @Length(8, 20, { message: 'Не меньше 8 и не больше 20' })
  readonly currentPassword?: string;

  @ApiPropertyOptional({ example: '87654321', description: 'New password user' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  @Length(8, 20, { message: 'Не меньше 8 и не больше 20' })
  readonly newPassword?: string;
}