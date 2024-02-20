import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { serverStaticConfig, typeORMMysqlConfig } from './config';
import {
  AuthModule,
  BoardModule,
  DataAccessModule,
  FileModule,
  SearchModule,
  UserModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeORMMysqlConfig),
    // ServeStaticModule.forRoot(serverStaticConfig),
    AuthModule,
    UserModule,
    BoardModule,
    SearchModule,
    FileModule,
    DataAccessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
