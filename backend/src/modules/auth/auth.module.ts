import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { jwtModuleConfig, passportJwtConfig } from '../../config';
import { DataAccessModule } from '../data-access/data-access.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register(passportJwtConfig),
    JwtModule.register(jwtModuleConfig),
    DataAccessModule,
  ],
  controllers: [AuthController],
  providers: [JwtAuthStrategy, AuthService],
  exports: [JwtAuthStrategy],
})
export class AuthModule {}
