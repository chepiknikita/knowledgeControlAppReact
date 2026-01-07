import {
  BadRequestException,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import {
  FILE_UPLOAD_CONFIG,
  FileUploadType,
} from 'src/config/file-upload.config';

export const createFileInterceptorOptions = (type: FileUploadType) => ({
  limits: FILE_UPLOAD_CONFIG[type].limits,
  fileFilter: (req, file, cb) => {
    if (!FILE_UPLOAD_CONFIG[type].allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new BadRequestException(
          `Недопустимый тип файла. Разрешены: ${FILE_UPLOAD_CONFIG[type].allowedMimeTypes.join(', ')}`,
        ),
        false,
      );
    }
    cb(null, true);
  },
});

export const createFileValidators = (type: FileUploadType) => [
  new MaxFileSizeValidator({
    maxSize: FILE_UPLOAD_CONFIG[type].limits.fileSize,
  }),
  new FileTypeValidator({
    fileType: new RegExp(
      `^(${FILE_UPLOAD_CONFIG[type].allowedMimeTypes.map((mime) => mime.replace('*', '.*')).join('|')})$`,
    ),
  }),
];
