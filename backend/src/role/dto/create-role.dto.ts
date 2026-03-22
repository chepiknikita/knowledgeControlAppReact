import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'user', description: 'Role name' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly name: string;

  @ApiProperty({ example: '', description: 'Role description' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  readonly description?: string;
}
