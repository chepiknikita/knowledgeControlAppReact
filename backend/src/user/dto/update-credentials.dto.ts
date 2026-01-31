import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from 'class-validator';

export class UpdateCredentialsDto {
  @ApiProperty({ example: 'login', description: 'Login user' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(5, 20, { message: 'Не меньше 5 и не больше 20' })
  readonly login?: string;

  @ApiProperty({ example: '12345678', description: 'Current password user' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(5, 20, { message: 'Не меньше 5 и не больше 20' })
  readonly currentPassword?: string;

  @ApiProperty({ example: '87654321', description: 'New password user' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(5, 20, { message: 'Не меньше 5 и не больше 20' })
  readonly newPassword?: string;
}