import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter';
import { ValidationPipe } from '@nestjs/common';
import { ValidationPipeConfig } from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe(ValidationPipeConfig));
  app.enableCors();
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
