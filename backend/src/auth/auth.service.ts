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

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private generateToken(user: User) {
    const payload = { login: user.login, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByLogin(userDto.login);
    const passwdEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwdEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Неверный login или пароль',
    });
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
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
      password: hashPasswd
    });

    return this.generateToken(user);
  }
}
