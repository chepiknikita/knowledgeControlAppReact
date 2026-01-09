import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { RoleService } from 'src/role/role.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileService } from 'src/file/file.service';
import * as bcrypt from 'bcryptjs';

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

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
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

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByName(dto.name);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }

    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, dto: UpdateUserDto, image: File) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    if (dto.login) {
      const candidate = await this.getUserByLogin(dto.login);
      if (candidate) {
        throw new HttpException(
          'Такой пользователь существует',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    try {
      const updateData: UpdateUserDto = { ...dto };
      let oldImagePath: string | null = null;

      if (user.avatar) {
        oldImagePath = user.avatar;
      }

      if (dto.password) {
        updateData.password = await bcrypt.hash(dto.password, 5);
      }

      if (image) {
        updateData.avatar = await this.fileService.createFile(image);
      }

      await this.userRepository.update(updateData, {
        where: { id },
      });

      if (oldImagePath && image) {
        await this.fileService.deleteFile(oldImagePath);
      }

      return await this.userRepository.findByPk(id);
    } catch (error) {
      console.error('Update error:', error);

      throw new HttpException(
        'Ошибка при обновлении пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (user) {
      try {
        await this.userRepository.destroy({
          where: { id },
        });

        if (user.avatar) {
          await this.fileService.deleteFile(user.avatar);
        }
        return {
          message: 'Пользователь успешно удален',
          id: id,
        };
      } catch (error) {
        console.error('Delete error:', error);
        throw new HttpException(
          'Ошибка при удалении пользователя',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    throw new HttpException('Пользователь не найдены', HttpStatus.NOT_FOUND);
  }

  async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
    const hashRefreshToken = refreshToken
      ? await bcrypt.hash(refreshToken, 5)
      : null;

    await this.userRepository.update(
      {
        refreshToken: hashRefreshToken,
      },
      { where: { id } },
    );
  }

  async clearRefreshToken(id: number): Promise<void> {
    await this.userRepository.update(
      {
        refreshToken: null,
      },
      { where: { id } },
    );
  }

  async validateRefreshToken(
    id: number,
    refreshToken: string,
  ): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id },
      include: ['id', 'refreshToken'],
    });

    if (!user || !user.refreshToken) {
      return false;
    }

    return await bcrypt.compare(refreshToken, user.refreshToken);
  }
}
