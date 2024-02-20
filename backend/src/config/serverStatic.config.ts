import * as path from 'path';
import { ServeStaticModuleOptions } from '@nestjs/serve-static';

export const serverStaticConfig: ServeStaticModuleOptions = {
  rootPath: path.join(__dirname, '..', '..', 'public', 'static'),
  exclude: ['/api*'],
};
