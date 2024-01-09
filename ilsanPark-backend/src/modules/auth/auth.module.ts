import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { passportJwtConfig } from '../../config';
import { DataAccessModule } from '../data-access/data-access.module';

@Module({
  imports: [PassportModule.register(passportJwtConfig), DataAccessModule],
  controllers: [AuthController],
  providers: [JwtAuthStrategy, AuthService],
  exports: [JwtAuthStrategy],
})
export class AuthModule {}
