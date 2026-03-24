import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.model';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private generateTokens(user: User) {
    const basePayload = {
      login: user.login,
      id: user.id,
      roles: user.roles,
      avatar: user.avatar,
    };

    const accessToken = this.jwtService.sign(basePayload, {
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES') || '15m',
    });

    const refreshToken = this.jwtService.sign(
      { ...basePayload, type: 'refresh' },
      {
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES') || '7d',
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByLogin(userDto.login);
    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    const isPasswordValid = await bcrypt.compare(userDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    return user;
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const tokens = this.generateTokens(user);
    await this.userService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async signUp(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(userDto.login);
    if (candidate) {
      throw new HttpException(
        'Такой пользователь существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.userService.createUser({
      login: userDto.login,
      password: hashedPassword,
    });

    const tokens = this.generateTokens(user);
    await this.userService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async refreshTokens(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      if (decoded.type !== 'refresh') {
        throw new UnauthorizedException('Невалидный тип токена');
      }

      const isValid = await this.userService.validateRefreshToken(
        decoded.id,
        refreshToken,
      );

      if (!isValid) {
        throw new UnauthorizedException();
      }

      const user = await this.userService.getUserById(decoded.id);

      if (!user) {
        throw new UnauthorizedException();
      }

      const tokens = this.generateTokens(user);

      await this.userService.updateRefreshToken(user.id, tokens.refreshToken);

      return tokens;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      const isJwtError = error?.name === 'JsonWebTokenError' || error?.name === 'TokenExpiredError';
      if (isJwtError) {
        throw new UnauthorizedException('Недействительный токен');
      }
      throw new InternalServerErrorException();
    }
  }

  async logout(userId: number) {
    await this.userService.clearRefreshToken(userId);
  }

  // async logoutAll(userId: number) {
  //   // Для сброса всех сессий (например, при смене пароля)
  //   await this.userService.clearRefreshToken(userId);
  //   // Дополнительно можно инвалидировать все access токены
  // }
}
