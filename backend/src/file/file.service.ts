import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
  private readonly staticPath: string;

  constructor() {
    this.staticPath = path.join(process.cwd(), 'static');
    if (!fs.existsSync(this.staticPath)) {
      fs.mkdirSync(this.staticPath, { recursive: true });
    }
  }

  async createFile(file: any): Promise<string> {
    try {
      const extension = file.mimetype.split('/')[1];
      const fileName = `${uuid.v4()}.${extension}`;
      const filePath = path.join(this.staticPath, fileName);

      fs.writeFileSync(filePath, file.buffer);
      return `static/${fileName}`;
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при обработке файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFile(filePath: string): Promise<boolean> {
    try {
      const fileName = filePath.replace('static/', '');
      const fullPath = path.join(this.staticPath, fileName);
      
      if (!fs.existsSync(fullPath)) {
        console.warn(`Файл не найден: ${fullPath}`);
        return false;
      }

      // Удаляем файл
      fs.unlinkSync(fullPath);
      return true;
      
    } catch (error) {
      console.error(`Ошибка при удалении файла ${filePath}:`, error);
      return false;
    }
  }
}
