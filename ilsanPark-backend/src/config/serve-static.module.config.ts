import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import * as path from 'path';
import { config } from 'dotenv';

config();

export const serveStaticModuleConfig: ServeStaticModuleOptions = {
  // rootPath: process.env.FILE_PATH,
  rootPath: path.join(__dirname, '..', '..', 'public', 'file'),
};
