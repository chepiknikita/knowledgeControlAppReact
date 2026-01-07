export const FILE_UPLOAD_CONFIG = {
  IMAGE: {
    limits: {
      fileSize: 50 * 1024 * 1024,
      files: 1,
    },
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  },
  USER_AVATAR: {
    limits: {
      fileSize: 5 * 1024 * 1024,
      files: 1,
    },
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  },
};

export type FileUploadType = keyof typeof FILE_UPLOAD_CONFIG;
