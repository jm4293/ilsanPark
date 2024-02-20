import { JwtModuleOptions } from '@nestjs/jwt';
import { config } from 'dotenv';

config();

export const jwtModuleConfig: JwtModuleOptions = {
  secret: process.env.SECRET_KEY,
  signOptions: {
    expiresIn: 3600,
  },
};
