import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateRefreshTokenDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
