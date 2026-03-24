import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);
  private readonly staticPath: string;

  constructor() {
    this.staticPath = path.join(process.cwd(), 'static');
    if (!fs.existsSync(this.staticPath)) {
      fs.mkdirSync(this.staticPath, { recursive: true });
    }
  }

  async createFile(file: Express.Multer.File): Promise<string> {
    const extension = file.mimetype.split('/').pop();
    if (!extension) {
      throw new HttpException(
        'Неверный тип файла',
        HttpStatus.BAD_REQUEST,
      );
    }

    const fileName = `${uuid.v4()}.${extension}`;
    const filePath = path.join(this.staticPath, fileName);

    try {
      await fsp.writeFile(filePath, file.buffer);
      return `static/${fileName}`;
    } catch {
      throw new HttpException(
        'Произошла ошибка при обработке файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFile(filePath: string): Promise<boolean> {
    const fileName = path.basename(filePath.replace(/^static\//, ''));
    const fullPath = path.resolve(this.staticPath, fileName);

    if (!fullPath.startsWith(this.staticPath)) {
      this.logger.warn(`Отклонён небезопасный путь: ${filePath}`);
      return false;
    }

    try {
      await fsp.unlink(fullPath);
      return true;
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        this.logger.warn(`Файл не найден: ${fullPath}`);
        return false;
      }
      this.logger.error(`Ошибка при удалении файла ${filePath}`, error);
      return false;
    }
  }
}
