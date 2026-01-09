import {
  HttpException,
  HttpStatus,
  Injectable,
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
    const payload = { login: user.login, id: user.id, roles: user.roles };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES') || '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES') || '7d',
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });

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
    const passwdEquals = await bcrypt.compare(userDto.password, user.password);
    if (!passwdEquals) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    return user;
  }

  async login(userDto: CreateUserDto) {
    try {
      const user = await this.validateUser(userDto);
      const tokens = this.generateTokens(user);
      await this.userService.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      throw error;
    }
  }

  async signUp(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(userDto.login);
    if (candidate) {
      throw new HttpException(
        'Такой пользователь существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPasswd = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      login: userDto.login,
      password: hashPasswd,
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
      throw new UnauthorizedException('Недействительный токен');
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
