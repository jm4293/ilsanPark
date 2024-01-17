import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { ImageFileFilter } from '../filter';
import * as path from 'path';

config();

export const multerModuleConfig: MulterOptions = {
  storage: diskStorage({
    // destination: process.env.FILE_PATH,
    destination: path.join(__dirname, '..', '..', 'public', 'file'),
    filename: (reqest, file, callback) => {
      callback(null, uuidv4() + '.' + file.mimetype.split('/')[1]);
    },
  }),
  fileFilter: ImageFileFilter,
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
};
