import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'login', description: 'Login user' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(5, 20, { message: 'Не меньше 5 и не больше 20' })
  readonly login: string;

  @ApiProperty({ example: '12345678', description: 'Password user' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(5, 20, { message: 'Не меньше 5 и не больше 20' })
  readonly password: string;

  // @ApiProperty({ example: 'avatar.svg', description: 'Image' })
  // readonly avatar: string;
}
