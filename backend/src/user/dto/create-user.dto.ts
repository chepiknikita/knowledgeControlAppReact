import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'login', description: 'Login user' })
  readonly login: string;

  @ApiProperty({ example: '12345678', description: 'Password user' })
  readonly password: string;

  // @ApiProperty({ example: 'avatar.svg', description: 'Image' })
  // readonly avatar: string;
}
