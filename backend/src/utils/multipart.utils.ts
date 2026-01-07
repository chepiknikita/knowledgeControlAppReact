import { BadRequestException } from '@nestjs/common';

export function parseMultipartJson<T = any>(
  data: string,
  errorMessage: string = 'Неверный формат данных',
): T {
  if (!data) {
    return null;
  }

  try {
    return JSON.parse(data);
  } catch {
    throw new BadRequestException(errorMessage);
  }
}
