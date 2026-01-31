import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from 'src/role/role.service';
import { FileService } from 'src/file/file.service';
import * as bcrypt from 'bcryptjs';
import { UpdateCredentialsDto } from './dto/update-credentials.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RoleService,
    private fileService: FileService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const role = await this.roleService.getRoleByName('USER');
    const user = await this.userRepository.create(dto);

    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getUserByLogin(login: string) {
    return await this.userRepository.findOne({
      where: { login },
      include: { all: true },
    });
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async updateAvatar(id: number, image: File): Promise<User> {
    const user = await this.getUserOrThrow(id);

    const oldAvatar = user.avatar;
    const newAvatar = image
      ? await this.fileService.createFile(image)
      : null;

    await this.userRepository.update(
      { avatar: newAvatar },
      { where: { id } },
    );

    if (oldAvatar && newAvatar) {
      await this.fileService.deleteFile(oldAvatar);
    }

    return this.getUserOrThrow(id);
  }

  async updateCredentials(id: number, dto: UpdateCredentialsDto): Promise<User> {
    const user = await this.getUserOrThrow(id);

    await this.validateLogin(dto.login, user.id);

    const updateData = await this.buildCredentialsUpdateData(dto, user);

    if (!Object.keys(updateData).length) {
      return user;
    }

    await this.userRepository.update(updateData, { where: { id } });

    return this.getUserOrThrow(id);
  }

  async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
    await this.userRepository.update(
      {
        refreshToken: refreshToken
          ? await bcrypt.hash(refreshToken, 5)
          : null,
      },
      { where: { id } },
    );
  }

  async clearRefreshToken(id: number): Promise<void> {
    await this.userRepository.update(
      { refreshToken: null },
      { where: { id } },
    );
  }

  async delete(id: number): Promise<{ message: string; id: number }> {
    const user = await this.getUserOrThrow(id);

    await this.userRepository.destroy({ where: { id } });

    if (user.avatar) {
      await this.fileService.deleteFile(user.avatar);
    }

    return {
      message: 'Пользователь успешно удален',
      id,
    };
  }

  async validateRefreshToken(id: number, refreshToken: string): Promise<boolean> {
    const user = await this.userRepository.findByPk(id, {
      attributes: ['id', 'refreshToken'],
    });

    if (!user?.refreshToken) {
      return false;
    }

    return bcrypt.compare(refreshToken, user.refreshToken);
  }

  private async getUserOrThrow(id: number): Promise<User> {
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new HttpException('Пользователь не найден',  HttpStatus.NOT_FOUND);
    }

    return user;
  }

  private async validateLogin(login?: string, currentUserId?: number): Promise<void> {
    if (!login) return;

    const candidate = await this.getUserByLogin(login);

    if (candidate && candidate.id !== currentUserId) {
      throw new HttpException(
        'Такой пользователь существует',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async buildCredentialsUpdateData(dto: UpdateCredentialsDto, user: User): Promise<Partial<User>> {
    const updateData: Partial<User> = {};

    if (dto.login) {
      updateData.login = dto.login;
    }

    if (dto.newPassword) {
      if (!dto.currentPassword) {
        throw new HttpException('Текущий пароль обязателен', HttpStatus.BAD_REQUEST);
      }

      const isValid = await bcrypt.compare(dto.currentPassword, user.password);

      if (!isValid) {
        throw new HttpException('Неверный текущий пароль', HttpStatus.BAD_REQUEST);
      }

      updateData.password = await bcrypt.hash(dto.newPassword, 5);
    }

    return updateData;
  }
}
